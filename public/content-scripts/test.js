

function test(){
    console.log("hello?")
}

// use observer to check for a form on the page when triggered

const detectChange = async () => {
    onChange()

    const config = { attributes: false, childList: true, subtree: false }

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(onChange)

    // Start observing the target node for configured mutations
    observer.observe(document.body, config)
}

const onChange = async () => {
    if (!await detectForm()) {
        return
    }

    console.log(window.location.hostname)

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        console.log(request)
    })
    console.log("form detected (html insterted or smthn like that)")
}

const detectForm = () => {
    const forms = document.getElementsByTagName("form").length
    const user = document.querySelectorAll("form input[autocomplete=username]").length
    const email = document.querySelectorAll("form input[autocomplete=email]").length
    const passwords = document.querySelectorAll("form input[type=password]").length

    const sum = user + email + passwords
    
    console.log(document.getElementsByTagName("form"))
    console.log(`${forms}${user}${email}${passwords}`)

    if (sum > 0) {
        return true
    }
    return false
}

const fillForm = async () => {
    document.querySelector("form input[autocomplete=username]").value = "hello world"
}

//browser.runtime.onMessage.addListener(test)

setTimeout(detectChange, 1000)