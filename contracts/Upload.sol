//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract upload{
    struct Access{
        address user; // access to another account
        bool access; // true or false
    }

    //store the array of URL(from IPFS) related to the account
    mapping(address=> string[]) value;

    //To whom access is given (list of account address from Access struct)
    mapping(address=>Access[]) accessList; 

    mapping(address=>mapping(address=>bool)) ownership;

    mapping(address=>mapping(address=>bool)) previousData;

    //add the image url
    function add(address _user,string memory url) external{
        value[_user].push(url);
    }

    //Allow the user to access data
    function allow(address user) external{
        ownership[msg.sender][user] =true;
        if(previousData[msg.sender][user]){
            for(uint i=0;i<accessList[msg.sender].length;i++){
                if(accessList[msg.sender][i].user == user){
                    accessList[msg.sender][i].access =true;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(user,true));
            previousData[msg.sender][user] = true;
        }
    }

    //Disallow the user
    function disallow(address user) public{
        ownership[msg.sender][user] = false;
        for(uint i=0;i<accessList[msg.sender].length;i++){
            if(accessList[msg.sender][i].user == user){
                accessList[msg.sender][i].access = false;
            }
        }
    }

    //Function to display all the images
    function display(address _user) external view returns(string[] memory){
        require(_user == msg.sender || ownership[_user][msg.sender] , "You don't have access");
        return value[_user];
    } 

    //To display the list of accounts having the access
    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}