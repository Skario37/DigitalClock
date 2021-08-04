class SubClock {
  _container = document.createElement("div");
  _hoursContainer = document.createElement("div");
  _minutesContainer = document.createElement("div");
  _hours = document.createElement("div");
  _minutes = document.createElement("div");
  _h = undefined;
  _m = undefined;
  _h_iteration = 0;
  _m_iteration = 0;
  constructor() {
    this._container.classList.add("clock");
    this._hoursContainer.classList.add("hours-container");
    this._minutesContainer.classList.add("minutes-container");
    this._hours.classList.add("hours");
    this._minutes.classList.add("minutes");

    this._hoursContainer.appendChild(this._hours);
    this._minutesContainer.appendChild(this._minutes);
    this._container.appendChild(this._hoursContainer);
    this._container.appendChild(this._minutesContainer);

    this.update(7, 5);
  }

  update = (h, m) => {
    if (h === 7 && m === 5) {
      this._hours.classList.remove("active");
      this._minutes.classList.remove("active");
      this._container.classList.remove("active");
    } else if (this._h === 7 && this._m === 5 && (h !== this._h || m !== this._m)) {
      this._hours.classList.add("active");
      this._minutes.classList.add("active");
      this._container.classList.add("active");
    }
    if (h && h !== this._h) {
      // const h_duration = 0.5;
      if (h < this._h) this._h_iteration++;
      this._h = h;
      // this._hours.style.transitionDuration = `${h_duration}s`;
      this._hours.style.transform = `rotateZ(${this._h*30+360*this._h_iteration}deg)`;
    }

    if (m && m !== this._m) { 
      const m_duration = 0.5;
      if (m < this._m) this._m_iteration++;
      this._m = m;
      // this._minutes.style.transitionDuration = `${m_duration}s`;
      this._minutes.style.transform = `rotateZ(${this._m*6+360*this._m_iteration}deg)`;
    }
  }

  resetIteration = () => {
    this._h_iteration = 0;
    this._m_iteration = 0;
    this.update(7, 5);
  }

  getContainer = () => this._container;
}