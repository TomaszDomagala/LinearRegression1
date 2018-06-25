import React, {Component} from 'react';
import Avatar from 'react-avatar';
import ReactTooltip from 'react-tooltip';


class AboutMe extends Component {
    //https://image.ibb.co/dHjzeo/tomaszdomagala.jpg
    //https://image.ibb.co/m5oEC8/noweprof.png

    render() {
        return (<div className="container">
            <h3>About me</h3>
            <div className="row">
                <div className="col mb-2" data-tip="Not really professional but I really like this photo">
                    <Avatar name="Tomasz"
                            src="https://image.ibb.co/m5oEC8/noweprof.png" size={300}/>
                </div>
                <div className="col">
                    <h3>Hello I am Tomasz!</h3>
                    <p>I am a young full stack developer and machine learning enthusiast. I finally decided to start
                        studying machine learning seriously. I hope that I will find enough determination
                        <span role="img" aria-label="smiling face with smile and cold sweat"> 😅</span>
                        <br/>Wish me luck guys!</p>
                    <hr/>
                    <p><a rel="noopener noreferrer" target="_blank" className="link"
                          href="https://github.com/TomaszDomagala">My GitHub</a></p>
                    <p><a rel="noopener noreferrer" target="_blank" className="link"
                          href="https://www.linkedin.com/in/tomaszdomagala/">LinkedIn profile</a></p>
                    <p><a href="mailto:tomasz.domagala.contact@gmail.com" className="link">Message me!</a></p>
                </div>

            </div>

            <ReactTooltip effect="solid" place="bottom" delayShow={1000}/>
        </div>)
    }
}

export default AboutMe;