const { Issue } = require('../objects/issue')

module.exports = {
    IssueService: class IssueService {
        constructor() {
            this.issues = []
            this.nextId = 1
        }

        newIssue(type, description, date) {
            const issue = new Issue(this.nextId++, type, description, date)
            this.issues.push(issue)
            return issue
        }

        removeIssue(issueId) {
            this.issues = this.issues.filter((issue) => issue.Id != issueId)
        }

        hasIssues() {
            return this.issues.length > 0
        }

        getIssues() {
            return this.issues
        }

        reset() {
            this.issues = []
            this.nextId = 1
        }
    }
}