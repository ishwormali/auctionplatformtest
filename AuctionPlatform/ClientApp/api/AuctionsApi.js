

export  async function fetchAuctions(id) {
    try {
        
        let response = await fetch(`api/Auction` + (typeof id != 'undefined' ? `/${id}` : ''),{
            credentials: 'include'
        });
        let data = await response.json();
        return data;
        
    } catch (ex) {
        console.log('error while fetching',ex);
        throw ex;
    }
}

export async function addBid(id,bidAmount) {
    try {
        
        let response = await fetch(`api/Auction/bid/${id}`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({bidAmount })
        });
        let data = await response.json();
        
        return data;

    } catch (ex) {
        console.log('error while fetching', ex);
        throw ex;
    }
}