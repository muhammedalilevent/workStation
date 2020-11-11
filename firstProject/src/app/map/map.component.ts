import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import * as olProj from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import { Select } from "ol/interaction";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import IconAnchorUnits from "ol/style/IconAnchorUnits";
import TileWMS from "ol/source/TileWMS";
import { GetTimeService } from "./../get-time.service";
import { info } from "console";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"],
})
export class MapComponent implements OnInit {
  @Input() set resizeChecker(value) {
    if (this.map) {
      this.map.updateSize();
    }
  }
  @Output() screenInf = new EventEmitter<any>();
  @Output() vpInfo = new EventEmitter<object>();
  @Output() sendSec = new EventEmitter<number>();
  clickedPointTime;
  resizeCheck;
  splitScreen = true;
  iconFeature = new Feature({
    name: "Arrived Location",
  });
  image = new Icon({
    scale: 1,
    //anchor: [25, 25],
    anchorXUnits: IconAnchorUnits.PIXELS,
    anchorYUnits: IconAnchorUnits.PIXELS,
    opacity: 0,
    src: "assets/imageAsset.png",
  }) as any;
  view = new View({
    center: olProj.fromLonLat([28.9495834, 41.0507058]),
    zoom: 13,
  });
  map;
  source = new VectorSource();
  vLayer = new VectorLayer({
    source: this.source,
  });
  vpData = {
    id: " ",
    startSecond: Number,
  };
  tLayer;
  constructor(private getTime: GetTimeService) {}
  ngOnInit() {
    //Icon Oluşturma
    let iconDot = olProj.fromLonLat([25, 25]);
    let iconGeom = new Point(iconDot);

    this.iconFeature.setGeometry(iconGeom);
    let iconStyle = new Style({
      image: this.image,
    });
    this.iconFeature.setStyle(iconStyle);
    this.source.addFeature(this.iconFeature);
    //--------------------------------------------------------------------
    //Tile Layer ile WMS Ekleme-------------------------------------------
    this.tLayer = new TileLayer({
      source: new TileWMS({
        url: "https://dev-gis.ankageo.com/geoserver/videogps/wms",
        params: { LAYERS: "videogps:filtered_by_time_videogps", TILED: true },
        serverType: "geoserver",
      }),
    });

    //--------------------------------------------------------------------

    //Map Oluşturma---------------------------------------------
    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: this.view,
    });
    this.map.addLayer(this.tLayer);
    this.map.addLayer(this.vLayer);

    //-----------------------------------------------------------
    //Point'e Select Atama---------------------------------------

    const select = new Select();
    this.map.addInteraction(select);
    select.on("select", (evt) => {
      if (evt.selected.length !== 0) {
        let dotObj = evt.selected[0].getProperties();
      }
    });
    this.map.on("singleclick", (evt) => {
      const infoUrl: string = this.tLayer
        .getSource()
        .getFeatureInfoUrl(
          evt.coordinate,
          this.view.getResolution(),
          this.view.getProjection(),
          { info_format: "application/json" }
        );
      //BURDA ICON EKLENECEK NOKTANIN KONUMU LAZIM
      // let selectedDotsLoc = dotObj.geometry.getCoordinates();
      // this.iconMover(selectedDotsLoc);
      console.log(infoUrl);
      this.getTime.getVideoTime(infoUrl).subscribe((response: any) => {
        console.log("Sonucum", response);
        if (response && response.features && response.features.length !== 0) {
          let selectedDotsLoc = response.features[0].geometry.coordinates[0];
          this.iconMover(selectedDotsLoc);
          this.splitScreen = false;
          this.screenInf.emit(this.splitScreen);
          this.sendSec.emit(this.clickedPointTime);
          this.vpData.id = "UlNPq85lhzM";
          this.vpData.startSecond = response.features[0].properties.video_time;
          this.vpInfo.emit(this.vpData);
          console.log(response.features[0].properties.video_time);
        } else {
          console.log("Kayıt Yok");
        }
      });
      console.log("Response");
    });
  }
  //UlNPq85lhzM
  iconMover(x) {
    let iconDot = olProj.fromLonLat(
      olProj.transform(x, "EPSG:3857", "EPSG:4326")
    );
    console.log("Yeni Konum", x);

    let iconGeom = new Point(x);
    this.iconFeature.setGeometry(iconGeom);
    this.image.setOpacity(1);
  }
}
