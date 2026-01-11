const DEV_MODE = true; 

const BACKEND_URL = `http://localhost:8000`;
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
            throw new Error(` : ${responseData}`)
        }
        console.log(`/attendance response data: ${responseData}`)
    }

    catch (error){
        console.error(error)
    }
};

function getDateRange(){
    let startDate = startDateForm.value
    let endDate = endDateForm.value
    
    let dateSuccessMessage = `Successfully sent attendance request`;
    let dateWarningMessage = `Warning: End date ${endDate} is same as Start date ${startDate}`;
    let dateErrorMessage = `Error: End date ${endDate} must be after Start date ${startDate}`;
    let dateEmptyMessage = `Error: Please select both dates.`;

    // clear notif state
    notifMessagePopup.classList.remove('notification-visible', 'notification-success', 'notification-warning', 'notification-error');

    // show inteded notif
    const showNotification = (type, message) => {
        notifMessagePopup.classList.add('notification-visible');
        notifMessagePopup.classList.add(`notification-${type}`);
        notifMessage.innerHTML = message;
    }

    if (endDate === "" || startDate === "") {
        showNotification('error', dateEmptyMessage);
    }
    else if (endDate === startDate){
        showNotification('warning', dateWarningMessage);
    }
    else if (endDate < startDate){
        showNotification('error', dateErrorMessage);
    }
    else {
        showNotification('success', dateSuccessMessage);
    }

    return {
        "startDate": startDate,
        "endDate": endDate,
        "message": "hello from Albawani Client"
    }
};

function clearDateNotification(){
    notifMessagePopup.classList.remove("notification-visible")
    notifMessage.innerHTML = ""
}

if(requestAttendanceBtn) {
    requestAttendanceBtn.addEventListener('click', function() {
        const filteredDateRange = getDateRange();
        // Only send if valid (logic check optional, but keeping your original flow)
        // If you want to prevent sending on error, add check here.
        
        const attendanceServerResponse = sendAttendanceRequest(ATTENDANCE_API, filteredDateRange)
        setTimeout(() => {
            clearDateNotification()
        }, notificationDuration);
    });
}