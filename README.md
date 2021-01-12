# StudyPlayerByReact
This App is a player used for learning English such as TOEIC. <br/>
This App's data is managed on Browser(localStorage).

<img src="" width="760px">

# Features

* It can control the play speed.
* It can save the volume for each voice.
* It can play the sound file from position that you set. 
For example, when you set the position at 00:04, if you push the playback key, this player start from 00:04 instead of 00:00.  
* It can save the sound file with play position and play volume. Saved files can be played on Review Page.

# Usage

First, you need to place sound files under the directory called sound_files.

Example<br/>
public <br/>
├sound_files/<br/>
│    └**TOEIC_SAMPLE_1/**<br/>
│         ├─**sample1.mp3**<br/>
│         ├─**sample2.mp3**<br/>
│          .<br/>
│          .<br/>
├src/<br/>
├index.html<br/>
<br/>

* Input Sound File Page <br/>
Please drag&drop sound files(sample*.mp3) that you have placed before. <br/>
And input the directory name(TOEIC_SAMPLE_1). Then you click the register button. <br/>

# Keyboard Operation 

*To push the Space key is to stop or replay sound.
*To push the L key is to playback the sound.
*To push the ←key or →key is to move play position.
*To push the B key is to play a previous sound file.
*To push the N key is to play a next sound file.
*To push the P key is to set the play start position.

# Note

If you clear your Browser cache, this App's data is deleted simultaneously because this data managed on Browser(localStorage). 

# Recommended environment

Google Chrome 87.x
