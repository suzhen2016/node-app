let os = require('os')

class IP{
    constructor(){
    }
    static get_ip(){
        let os_ip = os.networkInterfaces()
        
        for(let k in os_ip){

            for(let i=0;i<os_ip[k].length;i++){

                if(os_ip[k][i].family=='IPv4' && os_ip[k][i].address!='127.0.0.1'){
                    
                    return os_ip[k][i].address;
                    
                }
            }
        }
    }
}

module.exports = IP;