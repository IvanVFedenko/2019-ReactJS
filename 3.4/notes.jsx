const DEFAULT_COLOR = 'yellow';
const COLORS = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'];

const Note = React.createClass ({
  handleDelete() {
    this.props.onDelete(this.props.id);
   },

  render() {
    const {
      color,
      children,
      onDelete
    } = this.props;

    return(
      <div className="note" style={{ backgroundColor: color}}>
        <span className="note__delete-icon" onClick={this.handleDelete}> × </span>
        {children}
      </div>
      );
    }
  });

const NoteEditor = React.createClass ({
getInitialState() {
  return {
    text: '',
    color: DEFAULT_COLOR
  };
},

  handleTextChange(event) {
    this.setState ({
      text: event.target.value
    });
  },

  handleNoteAdd() {
   const newNote = {
     text: this.state.text,
     id: Date.now(),
     color: this.state.color
   };
   this.props.onNoteAdd(newNote);
   this.resetState();
  },

  handleChangeColor(color){
    this.setState({
      color
    });
  },

    resetState(){
    this.setState({
      text: ''
    });
  },

  render() {
    return(
      <div className="editor">
        <textarea
          rows={6}
          placeholder="Enter your note here..."
          className= "editor__textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <div className="note_color">
          { COLORS.map( color =>
            <div className="select_note_color"
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => this.handleChangeColor(color)} >
              {this.state.color === color ? '✔' : null}
            </div>
          )}
        </div>
        <button className="editor__button"
                onClick={this.handleNoteAdd}>Add</button>
      </div>
    );
  }
});

const NotesGrid = React.createClass({
    componentDidMount() {
        const grid = this.grid;

        this.msnry = new Masonry(grid, {
            columnWidth: 240,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate(prevProps) {
        if (prevProps.notes !== this.props.notes) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render() {
        const {
            notes,
            onNoteDelete
        } = this.props;

        return (
            <div className="grid" ref={c => this.grid = c}>
                {
                    notes.map(note =>
                        <Note
                            key={note.id}
                            id={note.id}
                            color={note.color}
                            onDelete={onNoteDelete}
                        >
                            {note.text}
                        </Note>
                    )
                }
            </div>
        );
    }
});

const NotesApp = React.createClass ({
  getInitialState() {
    return {
       notes:[]
    };
  },

  componentDidMount() {
      const savedNotes = JSON.parse(localStorage.getItem('notes'));

      if (savedNotes) {
          this.setState({ notes: savedNotes });
      }
  },

  saveToLocalStorage() {
      const notes = JSON.stringify(this.state.notes);

      localStorage.setItem('notes', notes);
  },

  handleNoteAdd(newNote) {
    this.setState ({
      notes: [newNote, ...this.state.notes]
    }, this.saveToLocalStorage);
  },

  handleNoteDelete(noteId) {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    },

  render() {
    return(
      <div className="app">
        <h2 className="app__header">NotesApp</h2>
        <NoteEditor onNoteAdd={this.handleNoteAdd}/>
        <NotesGrid
          notes={this.state.notes}
          onNoteDelete={this.handleNoteDelete}
        />
      </div>
    );
  }
});

ReactDOM.render(
  <NotesApp/>,
  document.getElementById ('notes')
);
