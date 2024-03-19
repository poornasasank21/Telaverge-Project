import { Component } from '@angular/core';
import { ShortLinkService } from '../short-link.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-short-link',
  templateUrl: './create-short-link.component.html',
  styleUrls: ['./create-short-link.component.css']
})
export class CreateShortLinkComponent {
  originalUrl: string = '';
  shortLink: string = ''; 
  imagePath: string = 'assets/cardImg.png';

  constructor(
    private shortLinkService: ShortLinkService,
    private snackBar: MatSnackBar,
    private router: Router,
    
  ) {}

  createShortLink() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
      return;
    }

    this.shortLinkService.createShortLink(this.originalUrl, userId)
      .subscribe(
        response => {
          this.shortLink = response.short_link;
          this.showSnackBar('Short link created successfully!');
        },
        error => {
          console.error(error);
          this.showSnackBar('Error creating short link');
        }
      );
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 3000,
    });
  }

  copyText() {
    const textToCopy = document.getElementById('textToCopy') as HTMLParagraphElement;
    const range = document.createRange();
    range.selectNode(textToCopy);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);

    document.execCommand('copy');

    const copyButton = document.querySelector('.copy-button') as HTMLButtonElement;
    copyButton.innerText = 'Text Copied!';
    setTimeout(() => {
      copyButton.innerText = 'Copy Text';
    }, 1500);

    window.getSelection()?.removeAllRanges();
  }
}
