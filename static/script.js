const DEV_MODE = true; 

const BACKEND_URL = `http://127.0.0.1:5000`;
const ATTENDANCE_API = BACKEND_URL + `/request-attendance`;

const requestAttendanceBtn = document.getElementById("request-attendance-btn");
const startDateForm = document.getElementById("start-date");
const endDateForm = document.getElementById("end-date");
const notifMessagePopup = document.getElementById("notification-message-popup");
const notifMessage = document.getElementById("notification-message");


const notificationDuration = 3000;

async function sendAttendanceRequest(attendanceEndpoint, attendanceDateRange) {
    try {
        const response = await fetch (attendanceEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attendanceDateRange) 
        });
        
        const responseData = response.json()
        if (!responseData.ok){
            throw new Error(`idk something something: ${responseData}`)
        }
        console.log(`/attendance response data: ${responseData}`)
    }

    catch (error){
        console.error(error)
    }
};

function getDateRange(){
    const getcurrentDate = new Date()
    console.log(`Today: ${getcurrentDate}`)
    let startDate = startDateForm.value
    let endDate = endDateForm.value
    let dateSuccessMessage = `Successfully sent attendance request`;
    let dateWarningMessage = `Warning: your given end date ${endDate} is the same as your start date ${startDate}`;
    let dateErrorMessage = `Error: your given end date ${endDate} must be greater than your start date ${startDate}`;
    let dateEmptyMessage = `Error: your given end date or start date is empty.`;
    console.log(`START: ${startDate} || END: ${endDate}`)

    notifMessagePopup.classList.remove('success', 'warning', 'error');

    if (endDate == startDate){
        notifMessagePopup.classList.add("warning")
        notifMessagePopup.classList.add("visible")
        notifMessage.innerHTML = dateWarningMessage
        // console.warn(`your given end date ${endDate} is the same as your start date ${startDate}`);
    }
    else if (endDate>getcurrentDate){
        console.log(`Selected end date big`)
    }
    else if (endDate == "" || startDate =="") {
        notifMessagePopup.classList.add("error")
        notifMessagePopup.classList.add("visible")
        notifMessage.innerHTML = dateEmptyMessage
    }

    else if (endDate < startDate){
        notifMessagePopup.classList.add("error")
        notifMessagePopup.classList.add("visible")
        notifMessage.innerHTML = dateErrorMessage
        // console.error(`your given end date ${endDate} must be greater than your start date ${startDate}`)
    }
    else {
        notifMessagePopup.classList.add("success")
        notifMessagePopup.classList.add("visible")
        notifMessage.innerHTML = dateSuccessMessage
        // console.error(`your given end date ${endDate} must be greater than your start date ${startDate}`)
    }

    return {
        "startDate": startDate,
        "endDate": endDate,
        "message": "hello from Albawani Client"
    }
};

function clearDateNotification(){
    notifMessagePopup.classList.remove("visible")
    notifMessage.innerHTML = ""
}

requestAttendanceBtn.addEventListener('click', function() {
    const filteredDateRange = getDateRange();
    const attendanceServerResponse = sendAttendanceRequest(ATTENDANCE_API, filteredDateRange)
    setTimeout(() => {
        clearDateNotification()
    }, notificationDuration);
    console.log(attendanceServerResponse)
});

