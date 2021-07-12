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
            regionsMinLength: 0.2,
            dragSelection: {
                slop: 5
            }
        })
    ]
    });
    
    
    wavesurfer.load('https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3');
    
    wavesurfer.on('region-update-end', () =>{
      
    })
    wavesurfer.on('region-update-end', () => {
      this.regions = wavesurfer.regions.list;
      console.log(this.regions)
      this.entries = Object.entries(this.regions);
      this.entries.sort((a,b) => {
         return a[1].start - b[1].start;
      })
      if(this.entries.length == 2 && this.entries[0][1].end > this.entries[1][1].start ){
         wavesurfer.regions.list[this.entries[0][0]].onResize(this.entries[1][1].start- this.entries[0][1].end ,'end');
      } else {
         for(let i=0;i< this.entries.length - 1; i++){
            if(this.entries[i][1].end > this.entries[i+1][1].start ) {
               wavesurfer.regions.list[this.entries[i][0]].onResize(this.entries[i+1][1].start - this.entries[i][1].end  ,'end');
            }
           }
      }
      console.warn(this.entries)
    });



  }
  title = 'new-project';

  handleOverlap(){

}
















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
      if( arr[i][1].end >= arr[j][1].start ){
         console.log("there is an overlap")
         console.log("region",arr[j][1].start,arr[j][1].end);
         console.log('--')
         console.log("region",arr[i][1].start,arr[i][1].end);
      }
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
