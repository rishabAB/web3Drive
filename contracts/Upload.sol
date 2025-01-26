// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload{
    struct Access{
        address user; // user's address
        bool access; // Access to a particular user
    }
    mapping(address => string[]) value; // to store the image url
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList; // to give ownership
    mapping(address => mapping(address => bool)) previousData;

    function add(address _user,string calldata url) external{
        value[_user].push(url);
    } 

    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if(previousData[msg.sender][user] == true)
        {
            for(uint32 i=0;i<accessList[msg.sender].length;i++)
            {
                if(accessList[msg.sender][i].user == user)
                {
                    accessList[msg.sender][i].access = true;
                }

            }
        }
        else{
           accessList[msg.sender].push(Access(user,true));
           previousData[msg.sender][user] = true; 
        }
        
    }

    function disallow(address user) external{
        ownership[msg.sender][user] = false;
        for(uint i=0;i<accessList[msg.sender].length;i++)
        {
            if(accessList[msg.sender][i].user == user)
            {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns(string[] memory)
    {
        /** Here the first condition is basically the person who has uploaded the image(ideally the owner is accesssing it)
        and Second one is the person who is trying to aacess it has the access or not */
        require(_user == msg.sender || ownership[_user][msg.sender], "You Don't have access");
        return value[_user];
    }

    function shareAccess() public view returns (Access[] memory){
        return accessList[msg.sender];
    }
}