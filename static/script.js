const requestAttendanceBtn = document.getElementById("request-attendance-btn");
const startDateForm = document.getElementById("start-date");
const endDateForm = document.getElementById("end-date");
const notifMessagePopup = document.getElementById("notification-message-popup");
const notifMessage = document.getElementById("notification-message");


const notificationDuration = 3000;

function getDateRange(){

    let startDate = startDateForm.value
    let endDate = endDateForm.value
    let dateSuccessMessage = `Successfully sent attendance request`;
    let dateWarningMessage = `Warning: your given end date ${endDate} is the same as your start date ${startDate}`;
    let dateErrorMessage = `Error: your given end date ${endDate} must be greater than your start date ${startDate}`;
    console.log(`START: ${startDate} || END: ${endDate}`)

    notifMessagePopup.classList.remove('success', 'warning', 'error');

    if (endDate == startDate){
        notifMessagePopup.classList.add("warning")
        notifMessagePopup.classList.add("visible")
        notifMessage.innerHTML = dateWarningMessage
        // console.warn(`your given end date ${endDate} is the same as your start date ${startDate}`);
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
};

function clearDateNotification(){
    notifMessagePopup.classList,remove("visible")
    notifMessage.innerHTML = ""
}

requestAttendanceBtn.addEventListener('click', function() {
    getDateRange();
    setTimeout(() => {
        clearDateNotification()
    }, notificationDuration);
});

