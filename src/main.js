import './styles.css';

const commands = {
  help: () => `Available commands:
  help     - Show this help message
  clear    - Clear the terminal
  echo     - Echo a message
  date     - Show current date and time
  whoami   - Show current user`,
  clear: () => {
    const content = document.getElementById('terminal-content');
    content.innerHTML = '';
    return '';
  },
  echo: (args) => args.join(' '),
  date: () => new Date().toLocaleString(),
  whoami: () => 'guest@terminal-ui'
};

class Terminal {
  constructor() {
    this.content = document.getElementById('terminal-content');
    this.setupInput();
    this.commandHistory = [];
    this.historyIndex = -1;
  }

  setupInput() {
    this.content.addEventListener('click', () => {
      const input = this.getCurrentInput();
      if (input) {
        input.focus();
      }
    });

    document.addEventListener('keydown', (e) => {
      const input = this.getCurrentInput();
      if (!input) {
        return;
      }

      if (e.key === 'Enter') {
        this.handleCommand(input.value);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateHistory('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateHistory('down');
      }
    });
  }

  getCurrentInput() {
    return this.content.querySelector('.terminal-input');
  }

  navigateHistory(direction) {
    const input = this.getCurrentInput();
    if (direction === 'up' && this.historyIndex < this.commandHistory.length - 1) {
      this.historyIndex++;
    } else if (direction === 'down' && this.historyIndex >= 0) {
      this.historyIndex--;
    }

    if (this.historyIndex >= 0) {
      input.value = this.commandHistory[this.historyIndex];
    } else {
      input.value = '';
    }
  }

  handleCommand(cmd) {
    const trimmedCmd = cmd.trim();
    if (trimmedCmd) {
      this.commandHistory.unshift(trimmedCmd);
      this.historyIndex = -1;

      const [command, ...args] = trimmedCmd.split(' ');
      const output = commands[command] 
        ? commands[command](args)
        : `Command not found: ${command}. Type 'help' for available commands.`;

      this.addOutput(trimmedCmd, output);
    } else {
      this.addNewLine();
    }
  }

  addOutput(command, output) {
    const commandDiv = document.createElement('div');
    commandDiv.className = 'terminal-line';
    commandDiv.innerHTML = `<span class="terminal-prompt">$</span> ${command}`;

    if (output) {
      const outputDiv = document.createElement('div');
      outputDiv.className = 'terminal-output';
      outputDiv.textContent = output;
      this.content.appendChild(commandDiv);
      this.content.appendChild(outputDiv);
    } else {
      this.content.appendChild(commandDiv);
    }

    this.addNewLine();
  }

  addNewLine() {
    const newLine = document.createElement('div');
    newLine.className = 'terminal-line';
    newLine.innerHTML = `
      <span class="terminal-prompt">$</span>
      <input type="text" class="terminal-input" autofocus>
    `;
    this.content.appendChild(newLine);
    newLine.querySelector('.terminal-input').focus();
    this.content.scrollTop = this.content.scrollHeight;
  }
}

// Initialize the terminal
new Terminal();
