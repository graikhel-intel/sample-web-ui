/*********************************************************************
* Copyright (c) Intel Corporation 2021
* SPDX-License-Identifier: Apache-2.0
**********************************************************************/
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { DevicesService } from '../devices/devices.service'
import { SharedModule } from '../shared/shared.module'
import { DashboardComponent } from './dashboard.component'

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>
  let getStatsSpy: jasmine.Spy

  beforeEach(async () => {
    const devicesService = jasmine.createSpyObj('DevicesService', ['getStats'])

    getStatsSpy = devicesService.getStats.and.returnValue(of({}))
    await TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [DashboardComponent],
      providers: [{ provide: DevicesService, useValue: devicesService }]

    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(getStatsSpy).toHaveBeenCalled()
  })
})
