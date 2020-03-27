import { AccountService } from './../account.service';
import { LoggingService } from './../logging.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private accountService: AccountService) {}

  onSetTo(status: string) 
  {
    // this.loggingService.logStatusChanged(status);
    this.accountService.updateStatus(this.id, status);
  }
}
