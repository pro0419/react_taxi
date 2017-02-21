import moment from 'moment'
import {API_CONFIG} from '../../config/axios/axios-config';
var client = require('twilio')('ACf7f226de232f0af117b36cec35d15c73', 'b0f74f30a6c9519f4a2c47065fb3fcce');
    // Troy Live
// ACa6bbd1a6fadaa82cb2ae65175dc7f052
// 843aad89d381d13b021bea30d785a1b6
    // Troy Test
// AC87f456f011b5f96309449c6a976c28a6
// f84dd735d915ff1de90bbeed3ac7432e

/* Brett Live
    'ACf7f226de232f0af117b36cec35d15c73', 
    'b0f74f30a6c9519f4a2c47065fb3fcce'
*/
var toNum = [];
const fromNum = '';

/*
export default function twilioMain(app) {
    newPermitNotify(app);
    newTicketNotify(app)

    setInterval(() => {
        meterExpiredNotify(app);
    }, 60*1000);
}
*/
/*
function newTicketNotify(app) {

    app.post('/api/notify-parking-ticket', function (req, res) {
        // Do in 1 hour.
        setTimeout(() => {
            let newTicket = req.body;

            function getUserList() {
                return AXIOS_INSTANCE.get(`township_users?filter=(township_code=${newTicket.township_code})`)
            }

            function getUserProfile() {
                return AXIOS_INSTANCE.get(`user_profile`)
            }

            axios.all([getUserList(), getUserProfile()])
            .then(axios.spread(function (userList, userProfileList) {

                let emailHtml = `<h1>New Parking Ticket</h1>
                                <p><h3>User Id: ${newTicket.user_id}</h3></p>
                                <p><strong>Plate Name:</strong> ${newTicket.plate_no} </p>
                                <p><strong>Township:</strong> ${newTicket.township_code} </p>
                                <p><strong>Violation Fee:</strong> ${newTicket.violation_fee} </p>
                                <p><strong>Violation Code:</strong> ${newTicket.violation_code} </p>
                                <p><strong>Violation Location:</strong> ${newTicket.violation_location} </p>
                                <p><strong>Violation Detail:</strong> ${newTicket.violation_detail} </p>
                                <p><strong>Violation Description:</strong> ${newTicket.violation_description} </p>
                                <p><strong>Hearing Location:</strong> ${newTicket.hearing_location} </p>
                                <hr>`;
                let emailAddrList = []; 
                let emailTemplate = {
                    "html" : emailHtml,
                    "text" : "Text",
                    "subject" : "ParkEZly Notification: New Parking Ticket",
                    "from" : {
                        "name" : "ParkEZly Notification Bot",
                        "email" : "blsbox17@gmail.com"
                    },
                    "to" : emailAddrList
                };

                let filteredEmails = userList.data.resource.map((user) => { 
                    let userProfileFilter = _.filter(userProfileList.data.resource, {'user_id': user.user_id});
                    let userProfile = userProfileFilter[0];

                    if (userProfile !== null & userProfile !== undefined) {
                        return {"name": "ParkEZly Admin", "email": userProfile.email}
                    }  
                });

                emailTemplate.to = filteredEmails;
                console.log(emailTemplate.to)
                
                if (emailTemplate.html !== undefined && emailTemplate.html !== null && emailAddrList !== []) {
                        sendpulse.smtpSendMail(emailLogger, emailTemplate);  
                }
                res.send(emailTemplate)
            }))
            .catch(function(response){
                console.log(response);
            });
        }, 3600000); // 1 hour = 3600000 ms
    });
}

function newPermitNotify(app) {
    app.post('/api/notify-parking-permit', function (req, res) {

        let newPermit = req.body;
        //console.log(req.body)

        function getUserList() {
            return AXIOS_INSTANCE.get(`township_users?filter=(township_code=${newPermit.township_code})`)
        }

        function getUserProfile() {
            return AXIOS_INSTANCE.get(`user_profile`)
        }

        axios.all([getUserList(), getUserProfile()])
        .then(axios.spread(function (userList, userProfileList) {

            let emailHtml = `<h1>New Parking Permit Approved</h1>
                            <p><h3>User Id: ${newPermit.user_id}</h3></p>
                            <p><strong>Permit Name:</strong> ${newPermit.permit_name} </p>
                            <p><strong>Township:</strong> ${newPermit.township_code} </p>
                            <p><strong>Username:</strong> ${newPermit.user_name} </p>
                            <hr>`;
            let emailAddrList = []; 
            let emailTemplate = {
                "html" : emailHtml,
                "text" : "Text",
                "subject" : "ParkEZly Notification: New Parking Permit Approved",
                "from" : {
                    "name" : "ParkEZly Notification Bot",
                    "email" : "blsbox17@gmail.com"
                },
                "to" : emailAddrList
            };

            let filteredEmails = userList.data.resource.map((user) => { 
                let userProfileFilter = _.filter(userProfileList.data.resource, {'user_id': user.user_id});
                let userProfile = userProfileFilter[0];

                if (userProfile !== null & userProfile !== undefined) {
                    return {"name": "ParkEZly Admin", "email": userProfile.email}
                }  
            });

            emailTemplate.to = filteredEmails;
            console.log(emailTemplate.to)
            
            if (emailTemplate.html !== undefined && emailTemplate.html !== null && emailAddrList !== []) {
                    sendpulse.smtpSendMail(emailLogger, emailTemplate);  
            }
            res.send(emailTemplate)
        }))
        .catch(function(response){
            console.log(response);
        });
    });
}

function meterExpiredNotify() {
     function getParkedCars() {
        return AXIOS_INSTANCE.get('parked_cars?filter=(notified=NO)')
    }

    function getUserList() {
        return AXIOS_INSTANCE.get('township_users') //?filter=(township_code=FDV)
    }

    function getUserProfile() {
        return AXIOS_INSTANCE.get(`user_profile`)
    }

   axios.all([getParkedCars(), getUserList(), getUserProfile()])
    .then(axios.spread(function (parkedCars, userList, userProfileList) {

        let emailHtml;
        let emailAddrList; 
        let emailTemplate = {
            "html" : emailHtml,
            "text" : "Text",
            "subject" : "ParkEZly Notification: Meter Expired Users",
            "from" : {
                "name" : "ParkEZly Notification Bot",
                "email" : "blsbox17@gmail.com"
            },
            "to" : emailAddrList
        };

        let emailMap = parkedCars.data.resource.map((item) => {
            let parkedCarsData = item;
            let currentTime = moment().diff(moment(item.expiry_time), 'hours');

            if (currentTime < 0) {

            }

            return {
                id: item.id, 
                user_id: item.user_id, 
                plate: item.plate_no, 
                expiry_time: item.expiry_time, 
                township_code: item.township_code
            };
        });

        userList.data.resource.map((user) => { 
            emailHtml = "<h1>ParkEzly Meter Expired Users</h1>";
            emailAddrList = [];

            let filteredEmails = emailMap
            .filter((parkedCar) => {
                return parkedCar.township_code == user.township_code
            })
            .map((parkedCar) => {
                let userProfileFilter = _.filter(userProfileList.data.resource, {'user_id': user.user_id});
                let userProfile = userProfileFilter[0];

                if (userProfile !== null & userProfile !== undefined) {

                    emailHtml += `<p><h3>Plate: ${parkedCar.plate}</h3></p>
                    <p><strong>Database Id:</strong> ${parkedCar.id} </p>
                    <p><strong>Township:</strong> ${parkedCar.township_code} </p>
                    <p><strong>Expired Time:</strong> ${parkedCar.expiry_time} </p>
                    <hr>`;
                    emailTemplate.html = emailHtml;

                    //AXIOS_INSTANCE.put("parked_cars?ids=" + expiredUser.id, {"notified": "YES"})
                    return {"name": "ParkEZly Admin", "email": userProfile.email}
                }
            })   
            emailTemplate.to = filteredEmails;
            if (emailTemplate.html !== undefined && emailTemplate.html !== null && emailAddrList !== []) {
                sendpulse.smtpSendMail(emailLogger, emailTemplate);  
            }
        });
    }));


}
*/


/*

    client.calls.get(function(err, response) {
        response.calls.forEach(function(call) {
            console.log('Received call from: ' + call.from);
            console.log('Call duration (in seconds): ' + call.duration);
        });
    });

    client.calls.get({
        from:'+16513334455'
    }, function(err, response) {
        response.calls.forEach(function(call) {
            console.log('Received call from: ' + call.from);
            console.log('This call\'s unique ID is: ' + call.sid);
        });
    });

    AXIOS_INSTANCE.get('parked_cars')
    .then(function(response) {
        response.data.resource.map((data) => {
            if(data.notified !== "YES") {
                let parkedCarsData = data;
                let currentTime = moment().diff(moment(data.expiry_time), 'hours');
                if (currentTime < 0) {

                    mailOptions.subject = `Meter Expiration Notification for: data.plate_no`;
                    mailOptions.text = `${data.plate_no}'s meter has expired.`;
                    mailOptions.html = `${data.plate_no}'s meter has expired.`;

                    AXIOS_INSTANCE.get('townships_manager')
                    .then(function(response) {
                        response.data.resource.map((data) => {
                            if (data.manager_id == parkedCarsData.township_code) {
                                client.sms.messages.post({
                                    to: data.contact_phone,
                                    from:'+14012694541',
                                    body:`Message from ParkEZly Admin: ${data.plate_no}'s meter has expired.`
                                }, function(err, text) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    if (text) {
                                        console.log('You sent: '+ text.body);
                                        console.log('Current status of this text message is: '+ text.status);
                                    }
                                });
                                AXIOS_INSTANCE.put("parked_cars?ids=" + parkedCarsData.id, {"notified": "YES"})
                            }
                        })
                    })
                    .catch(function(response){
                        console.log(response);
                    })
                }
            }
            
        })
    })
    .catch(function(response){
        console.log(response);
    })

    client.sms.messages.post({
        to:'+16513334455',
        from:'+14012694541',
        body:'Testing SMS'
    }, function(err, text) {
        if (err) {
            console.log(err);
        }
        if (text) {
            console.log('You sent: '+ text.body);
            console.log('Current status of this text message is: '+ text.status);
        }
    });
*/
