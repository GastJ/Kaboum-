import { Component /*, ViewChild*/} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SharePage } from '../share/share';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { Keyboard } from '@ionic-native/keyboard';

/**
 * Generated class for the PicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html',
})
export class PicturePage {
  imageURL;
  loadimage:any; 
  sharePage = SharePage;
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  keyboardHideShow: boolean = false;
  /*@ViewChild('textInput') textInput ;*/
  constructor(	
		public navCtrl: NavController,
  	public navParams: NavParams,
  	public platform: Platform,
  	private media: Media,
  	private file: File,
  	private keyboard: Keyboard)
  {
    this.loadimage = this.navParams.get('image');
  }
  
  getAudioList() {
	  if(localStorage.getItem("audiolist")) {
	    this.audioList = JSON.parse(localStorage.getItem("audiolist"));
	    console.log(this.audioList);
	  }
  }
  ionViewWillEnter() {
  	this.getAudioList();
  }
  startRecord() {
	if (this.platform.is('ios')) {
	this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.m4a';
	this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
	this.audio = this.media.create(this.filePath);
	} else if (this.platform.is('android')) {
	this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
	this.filePath = this.file.externalCacheDirectory.replace(/file:\/\//g, '') + this.fileName;
	this.audio = this.media.create(this.filePath);
	}
	this.audio.startRecord();
	this.recording = true;
  }
  stopRecord() {
	  this.audio.stopRecord();
	  let data = { filename: this.fileName };
	  this.audioList.push(data);
	  localStorage.setItem("audiolist", JSON.stringify(this.audioList));
	  this.recording = false;
	  this.getAudioList();
  }
  playAudio(file,idx) {
	  if (this.platform.is('ios')) {
	    this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
	    this.audio = this.media.create(this.filePath);
	  } else if (this.platform.is('android')) {
	    this.filePath = this.file.externalCacheDirectory.replace(/file:\/\//g, '') + file;
	    this.audio = this.media.create(this.filePath);
	  }
	  this.audio.play();
	  this.audio.setVolume(0.8);
  }
  ionViewDidLeave(){
      this.audioList = [];
      localStorage.removeItem('audiolist');
  }
  //// KEYBOARD ////
  showKeyboard(){
   	this.keyboard.show();
  	this.keyboardHideShow = true;
  }
  hideKeyboard(){
  	this.keyboard.close();
  	this.keyboardHideShow = false;
  }
  /*setFocus(){
  	this.textInput.setFocus();
  }*/
  //// PUSH TO SHARE PAGE ////
  navigateofpicturepage(){ 
      let image = this.imageURL;   
      this.navCtrl.push(SharePage,{ image: image });
  }
}
