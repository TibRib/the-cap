/* GO Backend : 
type ResponseData struct{
	Media MediaInfos `json:"media"`
	FramesProcessed int `json:"frames_processed"`
	Deductions []FrameDeduction `json:"deductions"`
}
*/
export interface VisualInterpreterResponse{
    media : MediaInfos;
    frames_processed : number;
    deductions : Array<Deduction>;
}

/* GO Backend : 
type MediaInfos struct{
	Url string `json:"url"`
	Duration int `json:"duration"`
}*/
interface MediaInfos{
    url : string;
    duration : number;
}

/* GO Backend :
type FrameDeduction struct {
	FrameID int `json:"frame_id"`
	Text string `json:"text"`
}
*/
interface Deduction{
    frame_id : number;
    text : string;
}