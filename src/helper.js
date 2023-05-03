async function nostrLogin() {
    const pubkey = await window.nostr.getPublicKey();
    console.log(pubkey);
    nostrGetUserinfo(pubkey);
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('login-text').innerHTML = `Logged in as ${pubkey}`;
    return pubkey;
}

async function nostrSignEvent(eventId, option) {
    const e = 
    {
      "kind": 9734,
      "created_at": Date.now(),
      "tags": [
        ["e", eventId],
        // ["p", "<32-bytes hex of the recipient's key>, <primary poll host relay URL>"],
        ["poll_option", option]
      ],
      // "ots": "<base64-encoded OTS file data>",
      "content": "",
    };

    console.log("--- REQUEST SIGNING EVENT ---")
    console.log(e);
    const responseEvent = await window.nostr.signEvent(e);
    console.log("--- SIGNED EVENT ---")
    console.log(responseEvent);
    return responseEvent;
}

async function nostrGetUserinfo(pubkey) {
    const relay = new WebSocket('wss://relay.damus.io');
    let name = "";

    relay.onopen = function(event) {
        relay.send('["REQ", "133742070", {"kinds": [0], "authors": ["'+pubkey+'"]}]'); // TODO: Build correct Request
    };
    relay.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data[0] === "EVENT") {
            const foundName = JSON.parse(data[2].content)['name'];
            console.log("Found Name: " + foundName);
            document.getElementById('login-text').innerHTML = `Logged in as ${foundName}`;
        } else if (data[0] === "EOSE") {
            relay.close();
        }
    }
}