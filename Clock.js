class Clock {
  _clock = undefined;
  _containers = {
    hours: undefined,
    minutes: undefined,
    seconds: undefined,
    separators: undefined
  }
  _subclocks = {
    hours: {
      ones: {},
      tens: {}
    },
    minutes: {
      ones: {},
      tens: {}
    },
    seconds: {
      ones: {},
      tens: {}
    },
    separators: {},
  }
 
  _h = undefined;
  _m = undefined;
  _s = undefined;

  constructor() {
    this._clock = document.createElement("div");

    this._clock.id = "Clock"

    this._containers.hours = this._createNumber("hours");
    this._containers.minutes = this._createNumber("minutes");
    this._containers.seconds = this._createNumber("seconds");
    this._containers.separators = this._createSeparator();
    
    this._clock.appendChild(this._containers.hours);
    this._clock.appendChild(this._containers.separators.cloneNode(true));
    this._clock.appendChild(this._containers.minutes);
    this._clock.appendChild(this._containers.separators.cloneNode(true));
    this._clock.appendChild(this._containers.seconds);


    const numbers = this._getNumberConverted(0);
    for (let n = 0; n < numbers.length; n++) {
      this._subclocks.hours.ones[n].update(...numbers[n]);
      this._subclocks.hours.tens[n].update(...numbers[n]);

      this._subclocks.minutes.ones[n].update(...numbers[n]);
      this._subclocks.minutes.tens[n].update(...numbers[n]);

      this._subclocks.seconds.ones[n].update(...numbers[n]);
      this._subclocks.seconds.tens[n].update(...numbers[n]);
    } 
  }

  _createNumber = (t) => {
    const container = document.createElement("div");
    for (let i = 0; i < 2; i++) {
      const table = document.createElement("table");
      const tbody = document.createElement("tbody");
      let counter = 0;
      for (let j = 0; j < 6; j++) {
        const tr = document.createElement("tr");
        for (let k = 0; k < 4; k++) {
          const td = document.createElement("td");
          const subclock = new SubClock();
          if (i === 0) {
            this._subclocks[t].tens[counter] = subclock;
          } else if (i === 1) {
            this._subclocks[t].ones[counter] = subclock;
          }
          td.appendChild(subclock.getContainer());
          tr.appendChild(td);

          counter++;
        }
        tbody.appendChild(tr);
      }

      table.appendChild(tbody);
      container.appendChild(table);
    }
    return container;
  }

  _createSeparator = () => {
    const container = document.createElement("div");
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    let counter = 0;
    for (let i = 0; i < 6; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 2; j++) {
        const td = document.createElement("td");
        const subclock = new SubClock();
        this._subclocks.separators[counter] = subclock;

        if ((i === 1 || i === 3) && j === 0) {
          subclock.update(6, 15);
        } else if ((i === 1 || i === 3) && j === 1) {
          subclock.update(9, 30);
        } else if ((i === 2 || i === 4) && j === 0) {
          subclock.update(3, 60);
        } else if ((i === 2 || i === 4) && j === 1) {
          subclock.update(12, 45);
        }

        td.appendChild(subclock.getContainer());
        tr.appendChild(td);

        counter++;
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    container.appendChild(table);
    return container;
  }

  _getNumberConverted = (n) => {
    if (n === 0) { 
      return [
        [ 6,15], [ 9,15], [ 9,15], [ 9,30],
        [ 6,60], [ 6,15], [ 9,30 ], [12,30],
        [ 6,60], [ 6,60], [12,30], [12,30],
        [ 6,60], [ 6,60], [12,30], [12,30],
        [ 6,60], [ 3,60], [12,45], [12,30],
        [ 3,60], [ 3,45], [ 3,45], [12,45],
      ]
    } else if (n === 1) {
      return [
        [ 6,15], [ 9,15], [ 9,30], [ 7, 5],
        [ 3,60], [ 6,45], [12,30], [ 7, 5],
        [ 7, 5], [ 6,60], [12,30], [ 7, 5],
        [ 7, 5], [ 6,60], [12,30], [ 7, 5],
        [ 6,15], [ 9,60], [12,15], [ 9,30],
        [ 3,60], [ 3,45], [ 3,45], [12,45],
      ]
    } else if (n === 2) {
      return [
        [ 6,15], [ 9,15], [ 9,15], [ 9,30],
        [ 3,60], [ 3,45], [ 6,45], [12,30],
        [ 6,15], [ 9,15], [ 9,60], [12,30],
        [ 6,60], [ 3,30], [ 3,45], [12,45],
        [ 6,60], [12,15], [ 9,15], [ 9,30],
        [ 3,60], [ 3,45], [ 3,45], [12,45],
      ]
    } else if (n === 3) {
      return [
        [ 6,15], [ 9,15], [ 9,15], [ 9,30],
        [ 3,60], [ 3,45], [ 6,45], [12,30],
        [ 6,15], [ 9,15], [ 9,60], [12,30],
        [ 3,60], [ 3,45], [ 6,45], [12,30],
        [ 6,15], [ 9,15], [ 9,60], [12,30],
        [ 3,60], [ 3,45], [ 3,45], [12,45],
      ]
    } else if (n === 4) {
      return [
        [ 6,15], [ 9,30], [ 6,15], [ 9,30],
        [ 6,60], [12,30], [ 6,60], [12,30],
        [ 6,60], [12,15], [ 9,60], [12,30],
        [ 3,60], [ 3,45], [ 6,45], [12,30],
        [ 7, 5], [ 7, 5], [ 6,60], [12,30],
        [ 7, 5], [ 7, 5], [ 3,60], [12,45],
      ]
    } else if (n === 5) {
      return [
        [ 6,15], [ 9,15], [ 9,15], [ 9,30],
        [ 6,60], [ 3,30], [ 3,45], [12,45],
        [ 6,60], [12,15], [ 9,15], [ 9,30],
        [ 3,60], [ 3,45], [ 6,45], [12,30],
        [ 6,15], [ 9,15], [ 9,60], [12,30],
        [ 3,60], [ 3,45], [ 3,45], [12,45],
      ]
    } else if (n === 6) {
      return [
        [ 6,15], [ 9,15], [ 9,15], [ 9,30],
        [ 6,60], [ 3,30], [ 3,45], [12,45],
        [ 6,60], [12,15], [ 9,15], [ 9,30],
        [ 6,60], [ 6,15], [ 9,30], [12,30],
        [ 6,60], [ 3,60], [12,45], [12,30],
        [ 3,60], [ 3,45], [ 3,45], [12,45],
      ]
    } else if (n === 7) {
      return [
        [ 6,15], [ 9,15], [ 9,15], [ 9,30],
        [ 3,60], [ 3,45], [ 6,45], [12,30],
        [ 7, 5], [ 7, 5], [ 6,60], [12,30],
        [ 7, 5], [ 7, 5], [ 6,60], [12,30],
        [ 7, 5], [ 7, 5], [ 6,60], [12,30],
        [ 7, 5], [ 7, 5], [ 3,60], [12,45],
      ]
    } else if (n === 8) {
      return [
        [ 6,15], [ 9,15], [ 9,15], [ 9,30],
        [ 6,60], [ 6,15], [ 9,30], [12,30],
        [ 6,60], [ 3,60], [12,45], [12,30],
        [ 6,60], [ 6,15], [ 9,30], [12,30],
        [ 6,60], [ 3,60], [12,45], [12,30],
        [ 3,60], [ 3,45], [ 3,45], [12,45],
      ]
    } else if (n === 9) {
      return [
        [ 6,15], [ 9,15], [ 9,15], [ 9,30],
        [ 6,60], [ 6,15], [ 9,30], [12,30],
        [ 6,60], [ 3,60], [12,45], [12,30],
        [ 3,60], [ 3,45], [ 6,45], [12,30],
        [ 6,15], [ 9,15], [ 9,60], [12,30],
        [ 3,60], [ 3,45], [ 3,45], [12,45],
      ]
    }
  }

  _getDigits(number) {
    var digits = [];
    while (number > 0) {
        digits.push(number % 10);
        number = Math.trunc(number / 10);
    }
    digits.reverse();
    return digits;
  }

  getContainer = () => this._clock;

  start = () => {
    const date = new Date;
    const ms = date.getMilliseconds();
    this._periodicall(1000 - ms);
  }

  _periodicall = (time) => {
    setTimeout(() => {
      const date = new Date;

      const h = date.getHours();
      if (this._h !== h) {
        this._h = h;

        const h_digits = this._getDigits(this._h);

        if (h_digits.length === 0) {
          h_digits.unshift(0);
          h_digits.unshift(0);
        } else if (h_digits.length === 1) {
          h_digits.unshift(0);
        }

        const h_tens = this._getNumberConverted(h_digits[0]);
        const h_ones = this._getNumberConverted(h_digits[1]);

        for (let n = 0; n < h_tens.length; n++) {
          this._subclocks.hours.tens[n].update(...h_tens[n]);
        } 
        for (let n = 0; n < h_ones.length; n++) {
          this._subclocks.hours.ones[n].update(...h_ones[n]);
        } 
      }

      const m = date.getMinutes();
      if (this._m !== m) {
        this._m = m;

        const m_digits = this._getDigits(this._m);

        if (m_digits.length === 0) {
          m_digits.unshift(0);
          m_digits.unshift(0);
        } else if (m_digits.length === 1) {
          m_digits.unshift(0);
        }

        const m_tens = this._getNumberConverted(m_digits[0]);
        const m_ones = this._getNumberConverted(m_digits[1]);

        for (let n = 0; n < m_tens.length; n++) {
          this._subclocks.minutes.tens[n].update(...m_tens[n]);
        } 
        for (let n = 0; n < m_ones.length; n++) {
          this._subclocks.minutes.ones[n].update(...m_ones[n]);
        } 
      }

      const s = date.getSeconds();
      if (this._s !== s) {
        this._s = s;

        const s_digits = this._getDigits(this._s);

        if (s_digits.length === 0) {
          s_digits.unshift(0);
          s_digits.unshift(0);
          for (const tens in this._subclocks.seconds.tens) {
            this._subclocks.seconds.tens[tens].resetIteration();
          }
          for (const ones in this._subclocks.seconds.ones) {
            this._subclocks.seconds.ones[ones].resetIteration();
          }
        } else if (s_digits.length === 1) {
          s_digits.unshift(0);
        }

        const s_tens = this._getNumberConverted(s_digits[0]);
        const s_ones = this._getNumberConverted(s_digits[1]);

        
        for (const tens in this._subclocks.seconds.tens) {
          this._subclocks.seconds.tens[tens].update(...s_tens[tens]);
        } 
        for (const ones in this._subclocks.seconds.ones) {
          this._subclocks.seconds.ones[ones].update(...s_ones[ones]);
        } 
      }

      this._periodicall(1000);
    }, time);
  }
}