class CalendarService {
  
  constructor(actually,lastDay, month, weekDay){
    this.actually = actually;
    this.final = lastDay;
    this.month =  month;
    this.weekDay = weekDay;
    this.days = [];
    
    
    this.week = [
      "su","mo","tu","we",
      "th","fr","sa"
    ];

    this.months = [
      'enero','febrero','marzo','abril',
      'mayo','junio','julio','agosto',
      'septiembre','octubre','noviembre','diciembre'
    ]; 

    this.generateMonth();
  }

  async generateMonth(){
    for(let i = 1; i <= this.final; i++){
      this.days.push({
        day: i,
        month: `${this.months[this.month]}`,
        week: `${this.week[this.weekDay]}`,
        notes: []
      });
      this.weekDay ++;
      if (this.weekDay > 6){
        this.weekDay = 0;
      }
    }
  }

  async fullMonth(){
    return this.days;
  }

  async findAllDay(day){
    const search = this.days.find(item => item.day == day);
    return search;
  }

  async find(day,id){
    let searchNote = null;
    this.days[day-1].notes.forEach(element => {
      if(element.id == id){
        searchNote = {id: element.id,title: element.title, description: element.description};
      }
    });
    return searchNote;
  }

  async add(body,day){
    try{
      let i = day-1, newNote,  idValue = 0;
      const info = this.days[i].notes[0];
      if(info == undefined){
        newNote = {
          id: 0,
          ...body
        }
      } else{
        this.days[i].notes.forEach(element => {  idValue = element.id});
        newNote = {
          id: idValue + 1,
          ...body
        }
      }
      this.days[i].notes.push(newNote);
      return day;
    }catch(err){
      return new Error(err);
    }
  }

  async update(day,id,changes){
    try{
      let codyNote = null;
      const note = this.days[day-1].notes;
      this.days[day-1].notes[id] = {
        ...note,
        ...changes
      }
      return day;
    }catch(err){
      return err;
    }
  }

  async delete (day,id) { 
    const index = this.days[day-1].notes.splice(id,1);  
		return day; 
	}


}

// Mes actual
const actually = new Date();
const week = new Date(actually.getFullYear(),actually.getMonth(),1);
const date = new Date(actually.getFullYear(),actually.getMonth()+1,0);

module.exports = {CalendarService, actually, date, week};