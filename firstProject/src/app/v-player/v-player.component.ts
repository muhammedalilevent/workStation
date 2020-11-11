import { Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "app-v-player",
  templateUrl: "./v-player.component.html",
  styleUrls: ["./v-player.component.css"],
})
export class VPlayerComponent implements OnInit {
  YT: any;
  video: any;
  player: any;
  reframed: boolean = false;
  id = "";
  constructor() {}
  @Input() set incomingUrl(value) {
    //Point Selected'd an Gelecek Değişiklerin Dinlendiği Ve Reaksiyon Verildiği Yer
    if (this.player) {
      if (this.id === value.id) {
        this.player.seekTo(value.startSecond);
      } else {
        this.id = value.id;
        this.player.loadVideoById(value.id, value.startSecond);
      }
    } else {
      this.id = value.id;
    }
  }
  @Input() set cameSec(value) {
    if (this.player) {
    }
  }

  init() {
    if (window["YT"]) {
      this.startVideo();
      return;
    }
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window["onYouTubeIframeAPIReady"] = () => this.startVideo();
  }
  ngOnInit() {
    this.init();
  }
  startVideo() {
    this.reframed = false;
    this.player = new window["YT"].Player("player", {
      videoId: this.id,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onPlayerError.bind(this),
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }
  onPlayerReady(event) {
    event.target.playVideo();
  }
  onPlayerStateChange(event) {
    switch (event.data) {
      case window["YT"].PlayerState.PLAYING:
        if (this.cleanTime() === 0) {
          console.log("started", this.cleanTime());
        } else {
          console.log("playing", this.cleanTime());
        }
        break;
      case window["YT"].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          console.log("paused", "@", this.cleanTime());
        }
        break;
      case window["YT"].PlayerState.ENDED:
        console.log("ended");
        break;
    }
  }
  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }
  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log("", this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }
}
