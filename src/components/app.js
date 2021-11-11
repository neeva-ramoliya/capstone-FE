import React from "react";
import { autobind } from "core-decorators";
import Axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: true,
            originalFileName: null,
            originalVideo: null

        }

    }

    @autobind
    handleSubmit(event) {
        console.log("in submit", this.state.originalVideo)
        event.preventDefault();
        Axios.get("http://localhost:3000/api").then((response) => {
            const { data, status } = response;

            if (status == 200) {
                this.setState({"reba": data['reba_score']}, () => {
                
            const pose2dEl = document.getElementById("pose2d")
            pose2dEl.setAttribute("src", "data:video/mp4;base64," + data['pose2d'])
            // pose2dEl.dispatchEvent("load")
            // pose2dEl.dispatchEvent("play")


            const pose3dEl = document.getElementById("pose3d")
            pose3dEl.setAttribute("src", "data:video/mp4;base64," + data['pose3d'])
            // pose3dEl.dispatchEvent("load")
            // pose3dEl.dispatchEvent("play")
            }
                )
        }
    })
 }

    @autobind
    handleChange(event) {
        const originalVideo = event.target.files.length ? event.target.files[0] : null;
        console.log(originalVideo)
        this.setState({ originalVideo: originalVideo, originalFileName: event.target.value });
    }

    render() {
        const { showForm, originalVideo, originalFileName, pose2d, pose3d, reba } = this.state;

        return (<div class="app-container">
            <div className="title">
                <h3 className="app-title">Ergonomic in Sports through Human Pose Estimation using Computer Vision</h3>
                {
                    showForm ? (
                        <div className="upload-video-form col-sm-12 mt-5">
                            {/* <form onSubmit={this.handleSubmit}>
                                <label>
                                    Upload video:
                                    <input type="file" value={this.state.originalVideo} onChange={this.handleChange} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form> */}
                            <form className="mt-3" onSubmit={this.handleSubmit}>
                                <div className="form-group row">
                                    <div className="col-sm-4">
                                        <div className="input-group mt-3">
                                            <div className="custom-file">
                                                <input id="inputGroupFile03" type="file" className="custom-file-input" onChange={this.handleChange} />
                                                <label className="custom-file-label" for="inputGroupFile03">{originalFileName ? originalFileName : "Choose file"}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-2 btn-submit">
                                        <button type="submit" className="btn btn-primary"> Predict </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div></div>
                    )
                }


                <div className="output-panel">
                    {originalFileName ? <div className="flex-container">
                        <div className="original-video">
                            <video  loop autoPlay muted>
                                <source src={URL.createObjectURL(originalVideo)} type="video/mp4" />
                            </video>
                        </div>
                        <div className="2d-predictions">
                            <video id="pose2d" loop autoPlay muted>
                            </video>
                        </div>
                        <div className="3d-predictions">
                            <video id="pose3d" loop autoPlay muted>

                            </video>
                        </div>
                        { reba ? <div className="reba-score">
                            <div className="sub-title">{"Reba calculations"}</div>
                            <div className="desc avg-score">{"Final score : " + reba['avg']}</div>
                            {
                                reba['summary'].map((obj) => {
                                    return (
                                        <div className="desc frame-score">{`No of ${obj.score} score frames : ${obj.frames}`}</div>
                                    )
                                })                                

                            }
                        </div> : ""}
                    </div> : ""}
                </div>
            </div>
        </div>
        )
    }
}

export default App;


// function showImagesLikeVideo(index) {
//     index = index < Allimages.length ? index : 0;
//     canvas.style.background = "url(" + Allimages[index] + ".bmp)";
//     //show next image with a timeout
//     setTimeout(showImagesLikeVideo.bind(null, index + 1), 300);
// }

// showImagesLikeVideo(0);


// {
// 	"pose2d": video,
// 	"pose3d": video,
// 	"reba_score": {
// 		"avg": 5,
// 		"summary": [{
// 			"score": "low",
// 			"frames": 5
// 		},{
// 			"score": "medium",
// 			"frames": 10
// 		},{
// 			"score": "high",
// 			"frames": 42
// 		}]
// 	}
// }