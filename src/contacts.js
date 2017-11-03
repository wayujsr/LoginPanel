import * as React from "react";

class Contacts extends React.Component{
    render(){
        console.log(this)
        return(
            <div>
                {this.props.user}
                This is Contacts page
            </div>
        )
    }
}

export default Contacts;