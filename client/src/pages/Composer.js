import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import { KeyboardShortcuts, MidiNumbers } from 'react-piano';
import CustomPiano from '../components/CustomPiano';
import SoundfontProvider from '../components/SoundfontProvider';
import DimensionsProvider from '../components/DimensionsProvider';
import API from "../utils";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
  first: MidiNumbers.fromNote('c2'),
  last: MidiNumbers.fromNote('b7'),
};

class Composer extends Component {
  state = {
    notes: [],
    noteScript: "",
    prevNotes: [],
    tempo: "120",
    songTitle: "",
    infoModalShow: false,
    profile: null,
    showSaveModal: false,
    keyboardConfig: [{ natural: '', flat: '', sharp: '' }, { natural: '', flat: '', sharp: '' }],
  }

  constructor(props) {
    super(props)
    this.events = []
  }

  playNotes = () => {
    let string = this.state.noteScript.toLowerCase().replace(/\s/g, "");
    console.log(string)
    let chords = string.split(",")
    let timer = 0;
    Promise.all(chords.map(chord => {
      let promise = new Promise(resolve => {
        timer++;
        this.events.push(setTimeout(() => {
          let notes = chord.replace(/\[(.*?)\]/g, "$1")
          let newChord = []
          for (let i = 0; i < notes.length; i = i + 2) {
            let midiNumber;
            switch (notes[i]) {
              case "c":
                if (notes[i + 1] === "#") {
                  midiNumber = 1 + (12 * parseInt(notes[i + 2]))
                  newChord.push(midiNumber)
                  i++;
                } else {
                  midiNumber = 0 + (12 * parseInt(notes[i + 1]))
                  newChord.push(midiNumber)
                }
                break;
              case "d":
                if (notes[i + 1] === "#") {
                  midiNumber = 3 + (12 * parseInt(notes[i + 2]))
                  newChord.push(midiNumber)
                  i++;
                } else {
                  midiNumber = 2 + (12 * parseInt(notes[i + 1]))
                  newChord.push(midiNumber)
                }
                break;
              case "e":
                midiNumber = 4 + (12 * parseInt(notes[i + 1]))
                newChord.push(midiNumber)
                break;
              case "f":
                if (notes[i + 1] === "#") {
                  midiNumber = 6 + (12 * parseInt(notes[i + 2]))
                  newChord.push(midiNumber)
                  i++;
                } else {
                  midiNumber = 5 + (12 * parseInt(notes[i + 1]))
                  newChord.push(midiNumber)
                }
                break;
              case "g":
                if (notes[i + 1] === "#") {
                  midiNumber = 8 + (12 * parseInt(notes[i + 2]))
                  newChord.push(midiNumber)
                  i++;
                } else {
                  midiNumber = 7 + (12 * parseInt(notes[i + 1]))
                  newChord.push(midiNumber)
                }
                break;
              case "a":
                if (notes[i + 1] === "#") {
                  midiNumber = 10 + (12 * parseInt(notes[i + 2]))
                  newChord.push(midiNumber)
                  i++;
                } else {
                  midiNumber = 9 + (12 * parseInt(notes[i + 1]))
                  newChord.push(midiNumber)
                }
                break;
              case "b":
                midiNumber = 11 + (12 * parseInt(notes[i + 1]))
                newChord.push(midiNumber)
                break;
              default:
            }
          }
          resolve(newChord)
        }, (60000 / parseInt(this.state.tempo) / 2) * timer))
      })
      return promise.then(chord => {
        // create a copy of this.state.prevNotes
        let prevNotes = this.state.prevNotes.slice();
        // check chord length to avoid changing active state during waits
        if (chord.length > 0) {
          // use promise so it waits until loop is complete
          Promise.all(chord.map(note => {
            let promise = new Promise(resolve => {
              // set a variable = index of note
              let noteIndex = prevNotes.indexOf(note);
              // if note is not found...
              if (noteIndex === -1) {
                // resolve that note
                resolve(note)
              } else {
                // resolve a blank
                resolve("")
              }
            })
            // return promise which contains resolve value
            return promise;
          }))
            // after all promises have been resolved...
            .then(chordFilter => {
              // filter the new chord stored in chordFilters to remove blanks
              let filter = chordFilter.filter(note => note !== "");
              // update state to remove the notes that will be played next
              this.setState({
                notes: filter
              })
              // update state to play notes that were queued
              this.setState({
                notes: chord
              })
            })
          // set state's prevNotes to current notes
          this.setState({
            prevNotes: chord
          })
        }
      })
    }))
  }

  stopNotes = () => {
    this.events.forEach(event => clearTimeout(event))
    this.setState({
      notes: []
    })
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  showInfo = () => {
    this.setState({
      infoModalShow: true
    })
  }

  hideInfoModal = () => {
    this.setState({
      infoModalShow: false
    })
  }

  // save song
  saveSong = () => {
    console.log(this.state.profile)
    let newSong = {
      title: this.state.songTitle,
      notes: this.state.noteScript,
      composer: this.state.profile._id,
      tempo: this.state.tempo,
    }
    API.createSong(newSong)
      .then(song => {
        console.log(song)
        // showModal
        this.setState({
          showSaveModal: true,
          songId: song.data._id,
        })
      })
      .catch(err => {
        // this should never happen unless connection sucks
        console.log(err)
      })
  }

  // hide save modal
  hideSaveModal = () => {
    this.setState({
      showSaveModal: false,
    })
  }

  updateKeyboardShortcuts = array => {
    array = array.map(item => {
      if (item === null) {
        return ""
      } else {
        return item
      }
    });

    let shortcuts = [
      { natural: array[0], flat: '', sharp: array[1] },
      { natural: array[2], flat: array[1], sharp: array[3] },
      { natural: array[4], flat: array[3], sharp: '' },
      { natural: array[5], flat: '', sharp: array[6] },
      { natural: array[7], flat: array[6], sharp: array[8] },
      { natural: array[9], flat: array[8], sharp: array[10] },
      { natural: array[11], flat: array[10], sharp: '' },
      { natural: array[12], flat: '', sharp: array[13] },
      { natural: array[14], flat: array[13], sharp: array[15] },
      { natural: array[16], flat: array[15], sharp: '' },
      { natural: array[17], flat: '', sharp: array[18] },
      { natural: array[19], flat: array[18], sharp: array[20] },
      { natural: array[21], flat: array[20], sharp: array[22] },
      { natural: array[23], flat: array[22], sharp: '' },
      { natural: array[24], flat: '', sharp: array[25] },
      { natural: array[26], flat: array[25], sharp: array[27] },
      { natural: array[28], flat: array[27], sharp: '' },
      { natural: array[29], flat: '', sharp: array[30] },
      { natural: array[31], flat: array[30], sharp: array[32] },
      { natural: array[33], flat: array[32], sharp: array[34] },
      { natural: array[35], flat: array[34], sharp: '' },
      { natural: array[36], flat: '', sharp: array[37] },
      { natural: array[38], flat: array[37], sharp: array[39] },
      { natural: array[40], flat: array[39], sharp: '' },
      { natural: array[41], flat: '', sharp: array[42] },
      { natural: array[43], flat: array[42], sharp: array[44] },
      { natural: array[45], flat: array[44], sharp: array[46] },
      { natural: array[47], flat: array[46], sharp: '' },
      { natural: array[48], flat: '', sharp: array[49] },
      { natural: array[50], flat: array[49], sharp: array[51] },
      { natural: array[52], flat: array[51], sharp: '' },
      { natural: array[53], flat: '', sharp: array[54] },
      { natural: array[55], flat: array[54], sharp: array[56] },
      { natural: array[57], flat: array[56], sharp: array[58] },
      { natural: array[59], flat: array[58], sharp: '' },
      { natural: array[60], flat: '', sharp: array[61] },
      { natural: array[62], flat: array[61], sharp: array[63] },
      { natural: array[64], flat: array[63], sharp: '' },
      { natural: array[65], flat: '', sharp: array[66] },
      { natural: array[67], flat: array[66], sharp: array[68] },
      { natural: array[69], flat: array[68], sharp: array[70] },
      { natural: array[71], flat: array[70], sharp: '' },
    ]

    this.setState({
      keyboardConfig: shortcuts
    })
  }

  // make sure we get all the data we need from props
  componentDidUpdate() {
    if (this.props.loggedin && !this.state.loggedin) {
      API.getProfile(this.props.profile._id)
        .then(profile => {
          this.setState({
            profile: profile.data[0],
            loggedin: true,
          })
          this.updateKeyboardShortcuts(profile.data[0].config.keymap)
        })
    }
  }

  render() {

    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: noteRange.first,
      lastNote: noteRange.last,
      // notes: keys are generated from left to right starting from firstNote
      // each object contains a natural (white key) and its sharp/flat.
      // if natural starts on a key with no flat behind it, it will use the sharp key bind
      // which makes the next object key's flat keybind void
      keyboardConfig: this.state.keyboardConfig,
    });


    return (
      <div>
        <div className="bg-secondary p-3 rounded">
          <div className="d-flex">
            <button className="btn btn-dark text-light mb-1" onClick={this.playNotes}>Play</button>
            <button className="btn btn-dark text-light ml-3 mb-1" onClick={this.stopNotes}>Stop</button>
            <label className="btn bg-dark text-light ml-3 mb-1 tempoLbl">Tempo</label>
            <input name="tempo" type="text" className="btn btn-dark mb-1 text-left tempoInput" placeholder="tempo" value={this.state.tempo} onChange={this.handleChange} />
            <button className="btn btn-dark text-light ml-3 mb-1" onClick={this.saveSong}>Save Song</button>
          </div>
          <textarea name="songTitle" value={this.state.songTitle} onChange={this.handleChange} placeholder="Title" className="text-light bg-dark m-0 rounded" rows="1" spellCheck="false" />
          <textarea name="noteScript" id="notes" rows="10" className="bg-dark text-light rounded" onChange={this.handleChange} value={this.state.noteScript} spellCheck="false" />
          <DimensionsProvider>
            {({ containerWidth, containerHeight }) => (
              <SoundfontProvider
                instrumentName="acoustic_grand_piano"
                audioContext={audioContext}
                hostname={soundfontHostname}
                render={({ isLoading, playNote, stopNote }) => (
                  <CustomPiano
                    noteRange={noteRange}
                    width={containerWidth}
                    height={containerHeight}
                    playNote={playNote}
                    stopNote={stopNote}
                    disabled={isLoading}
                    keyboardShortcuts={keyboardShortcuts}
                    activeNotes={this.state.notes}
                  />
                )}
              />
            )}
          </DimensionsProvider>
        </div>
        <button className="btn btn-clear text-light" onClick={this.showInfo}>Instructions</button>
        <Modal
          show={this.state.infoModalShow}
          onHide={this.hideInfoModal}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="text-dark" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Instructions
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-dark">
            <div className="instructions">
              <h5>To Play:</h5>
              <p>Play by clicking on the piano keys or pressing the keyboard shortcuts printed on the keys.</p>
              <hr />
              <h5>Scripting:</h5>
              <p>
                Write the script in the form above the keyboard.<br />
                <strong>Example:</strong> C Minor in the 5th Octave<br />
                <code>[c5d#5g5]</code><br />
                This will play a c5, a d#5, and g5 together.<br /><br />
                <strong>Sequence Example:</strong><br />
                <code>[c5], [d5], [e5]</code><br />
                This will play a c5, then d5, then e5.<br /><br />
                <strong>Rests Example:</strong><br />
                <code>[c5], [], [d5], [], [e5]</code><br />
                This will play a c5, rest, d5, rest, then e5.<br /><br />
              </p>
              <hr />
              <h5>Tempo:</h5>
              <p>Each note/chord separated by a comma is an Eigth note, so write with that in mind.</p>
              <hr />
              <h5>Keymapping:</h5>
              <p>This can be configured in your Profile Settings.</p>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={this.state.showSaveModal}
          onHide={this.hideSaveModal}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header className="text-dark" closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              New Song
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-dark">
            You made a new composition, and it's absolutely <strong>Derpsical!</strong>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Composer;
