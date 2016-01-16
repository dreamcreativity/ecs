db.agents.remove({})
db.staffs.remove({})
db.students.remove({})
db.accommodations.remove({})
db.agentinvitations.remove({})
db.counters.remove({})
db.counters.insert({
	"next" : NumberInt(0) 
})
db.flightinfos.remove({})
db.programregistrations.remove({})
db.registrations.remove({})
db.tokens.remove({})
db.staffs.insert(
{
	"password" : "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
    "role" : "Staff",
    "position" : "Admin",
    "username" : "admin",
    "firstname" : "Admin",
    "lastname" : "ESC",
    "workphone" : "647-222-2222",
    "cellphone" : "647-222-2222",
    "email" : "esc.mailsystem@gmail.com",
    "lastLoginIP" : null,
    "lastLoginDateTime" : ISODate("2015-10-22T15:00:17.282Z"),
    "updateDate" : ISODate("2015-10-22T15:00:17.282Z"),
    "createDate" : ISODate("2015-10-22T15:00:17.282Z"),
    "isDelete" : false,
    "isShowOnHomePage" : false,
    "regions" : [],
    "googlePlus" : "",
    "linkedIn" : "",
    "facebook" : "",
    "description" : "this is description"
})