import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy
{
  private userSub: Subscription;
  isAuthenticated=false;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService){}

  ngOnInit(): void 
  {
    this.userSub=this.authService.user.subscribe(user=>
      {
        //this is the same as this.isAuthenticated = !user ? false : true;
        this.isAuthenticated=!!user;
      });
  }

  ngOnDestroy(): void 
  {
    this.userSub.unsubscribe();
  }

  onSaveData()
  {
    this.dataStorageService.storeRecipes();
  }

  onFetchData()
  {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout()
  {
    this.authService.logout();
  }
}
