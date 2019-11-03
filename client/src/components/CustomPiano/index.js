import React, { Component } from 'react';
import { Piano } from 'react-piano';
import difference from 'lodash.difference';
import PropTypes from 'prop-types';

class CustomPiano extends Component {

  state = {
    notes: []
  }

  static propTypes = {
    noteRange: PropTypes.object.isRequired,
    activeNotes: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    playNote: PropTypes.func.isRequired,
    stopNote: PropTypes.func.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    width: PropTypes.number,
    keyWidthToHeight: PropTypes.number,
    keyboardShortcuts: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        midiNumber: PropTypes.number.isRequired,
      }),
    ),
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeNotes !== prevProps.activeNotes) {
      this.handleNoteChanges({
        prevActiveNotes: prevProps.activeNotes || [],
        nextActiveNotes: this.props.activeNotes || [],
      });
    } else {
      this.handleNoteChanges({
        prevActiveNotes: prevProps.activeNotes || [],
        nextActiveNotes: this.props.activeNotes || [],
      })
    }
  }

  // This function is responsible for diff'ing activeNotes
  // and playing or stopping notes accordingly.
  handleNoteChanges = ({ prevActiveNotes, nextActiveNotes }) => {
    if (this.props.disabled) {
      return;
    }

    const notesStopped = difference(prevActiveNotes, nextActiveNotes);
    const notesStarted = difference(nextActiveNotes, prevActiveNotes);

    

    notesStarted.forEach((midiNumber) => {
      this.props.playNote(midiNumber);
    });
    
    notesStopped.forEach((midiNumber) => {
      this.props.stopNote(midiNumber);
    });
  };
  
    render() {
        const {
            playNote,
            stopNote,
            ...pianoProps
          } = this.props;

        return (
            <Piano
            playNote={this.props.playNote}
            stopNote={this.props.stopNote}
            activeNotes={this.state.notes}
            {...pianoProps}
          />
        )
    }
}

export default CustomPiano