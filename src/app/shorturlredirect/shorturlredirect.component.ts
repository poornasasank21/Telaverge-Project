import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShortLinkService } from '../short-link.service';

@Component({
  selector: 'app-shorturlredirect',
  templateUrl: './shorturlredirect.component.html',
  styleUrls: ['./shorturlredirect.component.css']
})
export class ShorturlredirectComponent implements OnInit {

  idValue: string = '';

  constructor(private route: ActivatedRoute,
    private shortLinkService: ShortLinkService,) {}

  ngOnInit() {
    this.idValue = this.route.snapshot.paramMap.get('id') as string;

    console.log('idValue: ', this.idValue);

    this.shortLinkService.redirectUrl(this.idValue)
    .subscribe(
       response => {
          window.location.href = response.original_url;
       },
        error => {
          console.error(error);
        }
      );
  }


}
