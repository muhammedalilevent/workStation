import { Component, Input, OnInit } from "@angular/core";
import { ResizeEvent } from "angular-resizable-element/interfaces/resize-event.interface";
import Map from "ol/Map";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  resizeChecker;
  title = "firstProject";
  select: string;
  vpOpener = false;
  vlOpener = false;
  incomingSec;
  splitScreen = true;
  vpInfo: {
    id: string;
    startSecond: number;
  };
  ngOnInit() {}
  onVPOpened(event) {
    console.log();

    this.vpOpener = true;
    this.vpInfo = {
      id: event.id,
      startSecond: event.startSecond,
    };
  }
  onSendComing(event) {
    this.incomingSec = event;
  }
  onResize(event) {
    console.log(event);

    this.resizeChecker = event.clientX;
  }
  screenChanger(event) {
    this.splitScreen = event;
  }
}
