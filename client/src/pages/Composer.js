import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import { KeyboardShortcuts, MidiNumbers } from 'react-piano';
import CustomPiano from '../components/CustomPiano';
import SoundfontProvider from '../components/SoundfontProvider';
import DimensionsProvider from '../components/DimensionsProvider';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net';

const noteRange = {
  first: MidiNumbers.fromNote('c2'),
  last: MidiNumbers.fromNote('b7'),
};

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  // notes: keys are generated from left to right starting from firstNote
  // each object contains a natural (white key) and its sharp/flat.
  // if natural starts on a key with no flat behind it, it will use the sharp key bind
  // which makes the next object key's flat keybind void
  keyboardConfig:
    [
      { natural: 'z', flat: 'a', sharp: 's' },
      { natural: 'x', flat: 's', sharp: 'd' },
      { natural: 'c', flat: 'd', sharp: 'f' },
      { natural: 'v', flat: 'f', sharp: 'g' },
      { natural: 'b', flat: 'g', sharp: 'h' },
      { natural: 'n', flat: 'h', sharp: 'j' },
      { natural: 'm', flat: 'j', sharp: 'k' },
      { natural: ',', flat: 'k', sharp: 'l' },
      { natural: '.', flat: 'l', sharp: ';' },
      { natural: '/', flat: ';', sharp: "'" },
      { natural: '', flat: '', sharp: '' },
      { natural: '', flat: '', sharp: '' },
      { natural: '', flat: '', sharp: '' },
      { natural: '', flat: '', sharp: '' },
      { natural: 'q', flat: '1', sharp: '2' },
      { natural: 'w', flat: '2', sharp: '3' },
      { natural: 'e', flat: '3', sharp: '4' },
      { natural: 'r', flat: '4', sharp: '5' },
      { natural: 't', flat: '5', sharp: '6' },
      { natural: 'y', flat: '6', sharp: '7' },
      { natural: 'u', flat: '7', sharp: '8' },
      { natural: 'i', flat: '8', sharp: '9' },
      { natural: 'o', flat: '9', sharp: '0' },
      { natural: 'p', flat: '0', sharp: '-' },
      { natural: "[", flat: '-', sharp: '=' },
    ],
});

class Composer extends Component {
  state = {
    notes: [],
    text: "",
    prevNotes: [],
    tempo: "120",
    songTitle: "",
    infoModalShow: false
  }

  constructor(props) {
    super(props)
    this.events = []
  }

  playNotes = () => {
    let string = this.state.text.toLowerCase().replace(/\s/g, "");
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
              let filter = chordFilter.filter(note => {
                if (note !== "") {
                  return note
                }
              })
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

  saveSong = () => {
    console.log("save song. work on me")
  }

  render() {
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
          <textarea name="songTitle" value={this.state.songTitle} onChange={this.handleChange} placeholder="Title" className="text-light bg-dark m-0 rounded" rows="1" spellcheck="false" />
          <textarea name="text" id="notes" rows="10" className="bg-dark text-light rounded" onChange={this.handleChange} value={this.state.text} spellcheck="false" />
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
              <p>Each note/chord separated by a comma is a Sixteenth note, so write with that in mind.</p>
              <hr />
              <h5>Keymapping:</h5>
              <p>This can be configured in your Profile Settings.</p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Composer;
