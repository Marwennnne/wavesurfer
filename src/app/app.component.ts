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
  entries:any;
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
      console.log(this.entries)
      this.quickSort(this.entries)
    });



  }
  title = 'new-project';

  quickSort = (arr, left = 0, right = arr.length - 1) => {
    let len = arr.length, index;
    if(len > 1) {
       index = this.partition(arr, left, right)
       if(left < index - 1) {
          this.quickSort(arr, left, index - 1)
       }
       if(index < right) {
          this.quickSort(arr, index, right)
       }
    }
    return arr
 }
    partition = (arr, left, right) => {
    let middle = Math.floor((right + left) / 2),
    pivot = arr[middle],
    i = left, // Start pointer at the first item in the

    j = right // Start pointer at the last item in the array
    while(i <= j) {
       // Move left pointer to the right until the value at the
       // left is greater than the pivot value
       while(arr[i][1].start < pivot[1].start) {
          i++
       }
       // Move right pointer to the left until the value at the
       // right is less than the pivot value
       while(arr[j][1].start > pivot[1].start) {
          j--
       }
       // If the left pointer is less than or equal to the
       // right pointer, then swap values
       if(i <= j) {
          [arr[i], arr[j]] = [arr[j], arr[i]] // ES6 destructuring swap
          i++
          j--
       }
    }
    return i
 }
}
