# StudyPlayer
This App is a player used for learning English such as TOEIC. <br/>
This App's data is managed on Browser(localStorage).

<img src="https://user-images.githubusercontent.com/64642177/104927868-4da56580-59e5-11eb-902f-3a77319042e0.png" width="760px">

# Features

* You can control the play speed.
* You can save the volume for each sound file.
* You can play the sound file from position that you set. <br/>
For example, when you set the position at 00:04, if you press the playback key, this player starts from 00:04 instead of 00:00.  
* You can save the sound file with play position and play volume. Saved files can be played on Review Page.<br />
* This app doesn't require installation work.  It can be used just by accessing html. <br />

# Usage

First, you need to place sound files under the directory called sound_files.

**Example**<br/>
public <br/>
├─sound_files/<br/>
│    └**TOEIC_SAMPLE_1/**<br/>
│　　　　　├─**sample1.mp3**<br/>
│　　　　　├─**sample2.mp3**<br/>
│ 　　　　　.<br/>
│ 　　　　　.<br/>
├─src/<br/>
├─index.html<br/>
<br/>

* Input Sound File Page <br/>
Please drag&drop sound files(sample*.mp3) that you have placed before. <br/>
You can drag&drop multiple file.<br/>
And input the directory name(TOEIC_SAMPLE_1). Then you click the register button. <br/>
<br/>
Finally, please access public/index.html by Chrome.

# Keyboard Operation 

* <kbd>Space</kbd><br/> To stop or replay sound.<br/>
* <kbd>L</kbd><br/> To playback the sound.<br/>
* <kbd>←</kbd> <kbd>→</kbd><br/> To move play position.<br/>
* <kbd>B</kbd><br/> To play a previous sound file.<br/>
* <kbd>N</kbd><br/> To play a next sound file.<br/>
* <kbd>P</kbd><br/> To set the play start position.<br/>

# Note

If you clear your Browser cache, this App's data is deleted simultaneously because this data managed on Browser(localStorage). 

# Recommended environment

Google Chrome 87.x
