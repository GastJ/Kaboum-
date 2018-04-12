import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SharePage } from '../share/share';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  providers: [Camera],
  templateUrl: 'main.html',
})
export class MainPage {
	imageURL;
  imageRenderURL;
  sharePage = SharePage;
  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  newItem;
  img: null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private camera: Camera,
    private media: Media,
    private file: File
    ) {
  }
  
  options: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true
  }
  popover: CameraPopoverOptions = {
    x: 20,
    y: 60,
    width: 200,
    height: 100,
    arrowDir: 1
  }
  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
       this.imageURL = 'data:image/jpeg;base64,' + imageData;
       /*this.drawText("");*/
       
    }, (err) => {
       console.log(err);
    });
  }
  getImage() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.imageURL = 'data:image/jpeg;base64,' + imageData;
      /*this.drawText("");*/

    }, (err) => {
      console.log(err);
    });
  }

  drawText(message:string){
    let factor = 0.4;
    let img = new Image(); //document.createElement('img');
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    img.src = this.imageURL;
    canvas.height = img.height*factor;
    canvas.width = img.width*factor;

    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    context.font = Math.round(img.height * 0.035) + "px Impact";
    context.textAlign = 'center';
    context.fillStyle = 'white';
    context.shadowColor = "black";
    context.shadowOffsetX = 5; 
    context.shadowOffsetY = 5; 
    context.shadowBlur = 7;
    /*context.fillText(message, canvas.width / 2, canvas.height * 0.8);*/
    this.printAtWordWrap(context, message, canvas.width / 2, canvas.height * 0.8, canvas.height * 0.15, canvas.width / 1.2);
    this.imageRenderURL = canvas.toDataURL();
  }
  //// Line break while drawing text on canvas ////
  printAtWordWrap( context , message:string, x, y, lineHeight, fitWidth)
  {
    fitWidth = fitWidth || 0;
    
    if (fitWidth <= 0)
    {
        context.fillText( message, x, y );
        return;
    }
    var words = message.split(' ');
    var currentLine = 0;
    var idx = 1;
    while (words.length > 0 && idx <= words.length)
    {
        var str = words.slice(0,idx).join(' ');
        var w = context.measureText(str).width;
        if ( w > fitWidth )
        {
            if (idx==1)
            {
                idx=2;
            }
            context.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
            currentLine++;
            words = words.splice(idx-1);
            idx = 1;
        }
        else
        {idx++;}
    }
    if  (idx > 0)
        context.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
  }
  //// End of line break ////
  /*getAudioList() {
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
    this.audioList.splice(0,1);
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
    this.audio.setVolume(1);
  }*/
  navigateofmainpage(){ 
      let image = this.imageRenderURL; 
      this.navCtrl.push(SharePage,{ image: image });
  }
}
