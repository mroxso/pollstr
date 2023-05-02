async function nostrLogin() {
    const pubkey = await window.nostr.getPublicKey();
    console.log(pubkey);
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('login-text').innerHTML = `Logged in as ${pubkey}`;
    return pubkey;
}