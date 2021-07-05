import { Component, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import Region from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  regions: any;
  entries: any = [];
  ngOnInit(): void {
    var wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      plugins: [
        Region.create({
            regionsMinLength: 2,
            dragSelection: {
                slop: 5
            }
        })
    ]
    });
    
    
    wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
    

    wavesurfer.on('region-update-end', () => {
      this.regions = wavesurfer.regions.list;
      this.entries = Object.entries(this.regions);
      this.checkTri();
      
    });


  }
  title = 'new-project';

  checkTri(){
    this.entries.sort((a,b) => a[1].start - b[1].start);
  }
}
