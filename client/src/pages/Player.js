import React, { Component } from 'react';
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

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  // notes: keys are generated from left to right starting from firstNote
  // each object contains a natural (white key) and its sharp/flat.
  // if natural starts on a key with no flat behind it, it will use the sharp key bind
  // which makes the next object key's flat keybind void
  keyboardConfig: [],
});

class Demo extends Component {
  state = {
    notes: [],
    text: "",
    prevNotes: [],
    tempo: "",
    title: "",
    composer: "",
    cid: "",
  }

  constructor(props) {
    super(props)
    this.events = []
  }

  componentDidMount() {
    API.findOne(this.props.match.params.id)
      .then(song => {
        this.setState({
          text: song.data[0].notes,
          composer: song.data[0].composer.displayname,
          title: song.data[0].title,
          cid: song.data[0].composer._id,
          tempo: song.data[0].tempo,
        })
      })
  }

  playNotes = () => {
    let string = this.state.text.toLowerCase().replace(/\s/g, "");
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
              let filter = chordFilter.filter(note => note !== "")
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

  render() {
    return (
      <div className="bg-secondary p-3 rounded">
        <div className="d-flex">
          <button className="btn btn-dark text-light mb-1" onClick={this.playNotes}>play</button>
          <button className="btn btn-dark text-light ml-3 mb-1" onClick={this.stopNotes}>stop</button>
          <label className="btn bg-dark text-light ml-3 mb-1 tempoLbl">Tempo</label>
          <input name="tempo" type="text" className="btn btn-dark mb-1 text-left tempoInput" placeholder="tempo" value={this.state.tempo} disabled />
          <span className="btn ml-auto text-light d-none d-md-block d-lg-block">Written by <a className="text-light" href={"../../profiles/" + this.state.cid}>{this.state.composer}</a></span>
        </div>
        <textarea className="text-light bg-dark m-0 rounded" rows="1" value={this.state.title} disabled></textarea>
        <textarea name="text" id="notes" rows="10" className="bg-dark text-light rounded" value={this.state.text} spellCheck="false" disabled>
        </textarea>

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
    );
  }
}

export default Demo;
