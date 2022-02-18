module.exports = {
    Issue: class Issue {
        constructor(id, type, description, date) {
            this.Id = id
            this.Type = type
            this.Description = description
            this.Date = date
        }
    }
}