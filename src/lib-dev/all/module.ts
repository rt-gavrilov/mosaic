import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// tslint:disable:no-console
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CdkTreeModule, FlatTreeControl, NestedTreeControl } from '@ptsecurity/cdk/tree';
import { McButtonModule } from '@ptsecurity/mosaic/button';
import { McButtonToggleModule } from '@ptsecurity/mosaic/button-toggle';

import { McCardModule } from '@ptsecurity/mosaic/card';
import { McCheckboxModule } from '@ptsecurity/mosaic/checkbox';
import { McDropdownModule } from '@ptsecurity/mosaic/dropdown';
import { McFormFieldModule } from '@ptsecurity/mosaic/form-field';
import { McIconModule } from '@ptsecurity/mosaic/icon';
import { McInputModule } from '@ptsecurity/mosaic/input';
import { McLayoutModule } from '@ptsecurity/mosaic/layout';
import { McLinkModule } from '@ptsecurity/mosaic/link';
import { McListModule } from '@ptsecurity/mosaic/list';
import { McModalModule, McModalService } from '@ptsecurity/mosaic/modal';
import { McNavbarModule } from '@ptsecurity/mosaic/navbar';
import { McProgressBarModule } from '@ptsecurity/mosaic/progress-bar';
import { McProgressSpinnerModule } from '@ptsecurity/mosaic/progress-spinner';
import { McRadioModule } from '@ptsecurity/mosaic/radio';
import { McSelectModule } from '@ptsecurity/mosaic/select';
import { McSplitterModule } from '@ptsecurity/mosaic/splitter';
import { McTagsModule } from '@ptsecurity/mosaic/tags';
import { McTextareaModule } from '@ptsecurity/mosaic/textarea';
import { McTimepickerModule } from '@ptsecurity/mosaic/timepicker';
import { McToggleModule } from '@ptsecurity/mosaic/toggle';
import { McToolTipModule } from '@ptsecurity/mosaic/tooltip';
import { McTreeFlatDataSource, McTreeFlattener, McTreeModule, McTreeNestedDataSource } from '@ptsecurity/mosaic/tree';
import { Observable, of as observableOf } from 'rxjs';

import { FileDatabase, FileFlatNode, FileNode } from '../tree/module';


const INTERVAL: number = 300;
const STEP: number = 4;
const MAX_PERCENT: number = 100;


@Component({
    selector: 'app',
    template: require('./template.html'),
    styleUrls: ['./styles.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FileDatabase]
})
export class DemoComponent {
    checked: boolean[] = [true, true, false];
    indeterminate: boolean = true;
    disabled: boolean = false;
    labelPosition = 'after';

    buttonToggleModelResult: string;

    typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

    folders = [
        {
            name: 'Photos',
            updated: new Date('1/1/16')
        },
        {
            name: 'Recipes',
            updated: new Date('1/17/16')
        },
        {
            name: 'Work',
            updated: new Date('1/28/16')
        }
    ];
    notes = [
        {
            name: 'Vacation Itinerary',
            updated: new Date('2/20/16')
        },
        {
            name: 'Kitchen Remodel',
            updated: new Date('1/18/16')
        }
    ];

    mode: string = 'determinate';
    percent: number = 0;
    intervalId: number;

    favoriteFruit: string;

    isDisabled: boolean = true;

    fruits = [
        'Apple',
        'Banana',
        'Tomato',
        'Крякать как уточка'
    ];

    selectionList = [
        {name: 'Yes', value: 'true', selected: false},
        {name: 'No', value: 'false', selected: true}
    ];

    singleSelected = 'Normal';
    multipleSelected = ['Normal', 'Hovered', 'Selected', 'Selected1', 'Boots', 'Clogs'];

    singleSelectFormControl = new FormControl('', Validators.required);

    multiSelectSelectFormControl = new FormControl([], Validators.pattern(/^w/));

    timeValue1: Date = new Date();

    treeControl: FlatTreeControl<FileFlatNode>;
    dataSource: McTreeFlatDataSource<FileNode, FileFlatNode>;
    treeFlattener: McTreeFlattener<FileNode, FileFlatNode>;

    nestedTreeControl: NestedTreeControl<FileNode>;
    nestedDataSource: McTreeNestedDataSource<FileNode>;

    constructor(private modalService: McModalService, database: FileDatabase) {
        setInterval(() => {
            this.percent = (this.percent + STEP) % (MAX_PERCENT + STEP);
        }, INTERVAL);

        this.treeFlattener = new McTreeFlattener(
            this.transformer, this._getLevel, this._isExpandable, this._getChildren
        );

        this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
        this.dataSource = new McTreeFlatDataSource(this.treeControl, this.treeFlattener);

        this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
        this.nestedDataSource = new McTreeNestedDataSource();

        database.dataChange.subscribe((data) => {
            this.dataSource.data = data;
            this.nestedDataSource.data = data;
        });
    }

    showConfirm() {
        this.modalService.success({
            mcContent   : 'Сохранить сделанные изменения в запросе "Все активы с виндой"?',
            mcOkText    : 'Сохранить',
            mcCancelText: 'Отмена',
            mcOnOk      : () => console.log('OK')
        });
    }

    toggleDisable() {
        this.isDisabled = !this.isDisabled;
    }

    transformer(node: FileNode, level: number) {
        const flatNode = new FileFlatNode();

        flatNode.name = node.name;
        flatNode.type = node.type;
        flatNode.level = level;
        flatNode.expandable = !!node.children;

        return flatNode;
    }

    hasChild(_: number, _nodeData: FileFlatNode) { return _nodeData.expandable; }

    hasNestedChild(_: number, nodeData: FileNode) {
        return !(nodeData.type);
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
    }

    private _getLevel(node: FileFlatNode) { return node.level; }

    private _isExpandable(node: FileFlatNode) { return node.expandable; }

    private _getChildren = (node: FileNode): Observable<FileNode[]> => {
        return observableOf(node.children);
    }

}


@NgModule({
    declarations: [
        DemoComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        McIconModule,
        McButtonModule,
        McButtonToggleModule,
        McLinkModule,
        McCardModule,
        McCheckboxModule,
        McDropdownModule,
        McInputModule,
        McFormFieldModule,
        McLayoutModule,
        McNavbarModule,
        McListModule,
        McModalModule,
        McProgressBarModule,
        McProgressSpinnerModule,
        McRadioModule,
        McSelectModule,
        McSplitterModule,
        McTagsModule,
        McTextareaModule,
        McTimepickerModule,
        McToggleModule,
        McToolTipModule,
        McTreeModule,
        CdkTreeModule
    ],
    bootstrap: [
        DemoComponent
    ]
})
export class DemoModule {}

platformBrowserDynamic()
    .bootstrapModule(DemoModule)
    .catch((error) => console.error(error));
