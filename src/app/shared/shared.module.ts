import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [HeaderComponent, SelectComponent],
  imports: [CommonModule, RouterModule, HttpClientModule],
  exports: [HeaderComponent, SelectComponent],
})
export class SharedModule {}
