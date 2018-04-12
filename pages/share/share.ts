import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ActionSheetController} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
//
//
/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
	message : string = "Julien vous a envoyé un Kaboum!";
	loadimage:any;
	fileDir: string;
	filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  dataUri: string;
  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public platform: Platform,
  	public loadingController: LoadingController,
  	public actionSheetController: ActionSheetController,
  	private media: Media,
    private file: File,
  	private socialSharing: SocialSharing
  	) 
  {
  	this.loadimage = this.navParams.get('image');

  	 /*getAudioList();*/
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
    /*this.fileName = this.audioList[0].filename;*/

  	if (this.platform.is('ios')) {
      this.fileDir = this.file.documentsDirectory.replace(/file:\/\//g, '');
    } else if (this.platform.is('android')) {
      this.fileDir = this.file.externalCacheDirectory.replace(/file:\/\//g, '');
    }
 		this.filePath = this.fileDir + this.fileName;
   	this.audio = this.media.create(this.filePath);
  }
  /*getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
    }
  }*/
  /*ionViewWillEnter() {
    this.getAudioList();
  }*/
  playAudio(file,idx) {
    /*if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalCacheDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }*/
    this.audio.play();
    this.audio.setVolume(1);
  }
  ////////// SOCIAL SHARING //////////
  /*regularShare(){
  	var uri = "file://" + this.fileDir + this.fileName;

     //this.socialSharing.share(this.message, "Kaboum!", src, null);
     alert("file://" + this.fileDir);
     alert(this.fileName);
  	this.file.readAsDataURL("file://" + this.fileDir, this.fileName)
  	.then(binStr => {
  			  	//contentURI = Base64.encodeURI(fileContent);
  			  	alert("READ IS OK");
  	})*/

  		 // this.socialSharing.share(this.message, "Kaboum!", null, null);
  
  	/*
  	let fileContent = File.read(this.filePath)
  	contentURI = Base64.encodeURI(fileContent);
  	let format = (ios) ? "audio/m4a" : "audio/3gp"
  	let dataURI = "data:" + format + ";base64," + contentURI ;
		*/
	
  	//.then(content => console.log(content))
	  //.catch(err => { throw err; });
  	/*dataUri = this.filePath;*/
	  //DataURI);
	
	/*}*/
	/*async regularShare(){
		alert(this.file);
		alert(this.fileDir);
		let directoryEntry = await this.file.resolveDirectoryUrl("file://" + this.fileDir);
		let fileEntry = await directoryEntry.getFile(this.fileName, { create: false });
		let file = await fileEntry.file();
		alert("HELLO");
	}*/

	regularShare(){
		this.socialSharing.share(this.message, "Kaboum!", this.loadimage, null);
	}
	whatsappShare(){
   this.socialSharing.shareViaWhatsApp(this.message, this.loadimage, null);
	}
	twitterShare(){
  	this.socialSharing.shareViaTwitter(this.message, this.loadimage, null);
	}
	facebookShare(){
    this.socialSharing.shareViaFacebook(this.message, this.loadimage, null);
	}
}
