
module.exports = {
    generateRandomAccountNumber: function() {
        var acctNumber = '';
        var characters = '0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
        acctNumber += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return acctNumber;
    },

    otherMethod: function() {},
};

