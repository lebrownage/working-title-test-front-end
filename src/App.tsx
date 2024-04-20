import { useState,useCallback, useMemo } from 'react'
import './App.css'
import InputText from '../components/forms/inputText'
import Textarea from '../components/forms/textarea'
import Select from '../components/forms/select'
import DropdownRenderer from '../components/dataTableGrid/dropdownRenderer'
import DataGrid,{ textEditor } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import type { Column, SortColumn } from 'react-data-grid';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Toast from 'react-bootstrap/Toast';
import Offcanvas from 'react-bootstrap/Offcanvas';

interface IRow { 
    id : number,
    title : string,
    option : string
}

function handleDataGripRowChange(row : IRow, value : any){
  console.log(row,value)
  // const findRow = rows.find(u=>u.id==row.id)
  // if(!findRow)
  //     return
  
  // findRow.option = value
}


const optionsTable = [
  { value: 'Option 1', label: 'Option 1' },
  { value: 'Option 2', label: 'Option 2' },
  { value: 'Option 3', label: 'Option 3' },
]

const columns : Column<IRow>[] = [
  { 
    key: 'id',
    name: 'id' ,
    resizable: true,
    sortable: true,
    draggable: true
  },
  { 
    key: 'title', 
    name: 'Title', 
    renderEditCell: textEditor ,
    resizable: true,
    sortable: true,
    draggable: true
  },
  {
    key : 'option',
    name : 'Options',
    renderEditCell: (props : any) => (
      <DropdownRenderer<IRow>
        {...props}
        options={optionsTable}
        isMulti={true} // Set to true for multi-select, false for single-select
        onChange={handleDataGripRowChange}
      />
    ),
    resizable: true,
    sortable: true,
    draggable: true

  }

]


function App() {
  // const [count, setCount] = useState(0)
  
  const [rows, setRows] = useState([
    { id: 10, title: 'Example', option : 'Option 1' },
    { id: 11, title: 'Demo', option : 'Option 2' }
  ]);

  //#region Start Column Reorder

  const [columnsOrder, setColumnsOrder] = useState(():  number[] =>
    columns.map((_, index) => index)
  );
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const onSortColumnsChange = useCallback((sortColumns: SortColumn[]) => {
    setSortColumns(sortColumns.slice(-1));
  }, []);
  const reorderedColumns = useMemo(() => {
    return columnsOrder.map((index) => columns[index]);
  }, [columnsOrder]);

  const sortedRows = useMemo((): readonly IRow[] => {
    if (sortColumns.length === 0) return rows;
    const { direction } = sortColumns[0];

    let sortedRows: IRow[] = [...rows];
    return direction === 'DESC' ? sortedRows.reverse() : sortedRows;
  }, [rows, sortColumns]);

  function onColumnsReorder(sourceKey: string, targetKey: string) {
    setColumnsOrder((columnsOrder) => {
      const sourceColumnOrderIndex = columnsOrder.findIndex(
        (index) => columns[index].key === sourceKey
      )
      const targetColumnOrderIndex = columnsOrder.findIndex(
        (index) => columns[index].key === targetKey
      )
      
      const sourceColumnOrder = columnsOrder[sourceColumnOrderIndex];
      const newColumnsOrder = columnsOrder.toSpliced(sourceColumnOrderIndex, 1);
      newColumnsOrder.splice(targetColumnOrderIndex, 0, sourceColumnOrder);

      return newColumnsOrder;
    })
  }
  //#endregion


  
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla1', label: 'Vanilla' },
    { value: 'butterscotch', label: 'Butterscotch' },
    { value: 'red_velvet', label: 'Red Velvet' },
    { value: 'rocky_road', label: 'Rocky Road' },
    { value: 'maple', label: 'Maple' },
    { value: 'honey', label: 'Honey' },
    { value: 'ginger', label: 'Ginger' },
    { value: 'black_forest', label: 'Black Forest' },
    { value: 'matcha', label: 'Matcha' },
    { value: 'pumpkin_spice', label: 'Pumpkin Spice' },
    { value: 'salted_caramel', label: 'Salted Caramel' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'almond', label: 'Almond' },
    { value: 'bubble_gum', label: 'Bubble Gum' },
    { value: 'mango', label: 'Mango' },
    { value: 'cotton_candy', label: 'Cotton Candy' },
    { value: 'peppermint', label: 'Peppermint' },
    { value: 'rum_raisin', label: 'Rum Raisin' },
    { value: 'toasted_marshmallow', label: 'Toasted Marshmallow' },
    { value: 'lemon_lime', label: 'Lemon Lime' },
    { value: 'blueberry_cheesecake', label: 'Blueberry Cheesecake' },
    { value: 'pistachio_rose', label: 'Pistachio Rose' },
    { value: 'lavender_honey', label: 'Lavender Honey' },
    { value: 'caramel_macchiato', label: 'Caramel Macchiato' },
    { value: 'chocolate_chip_cookie_dough', label: 'Chocolate Chip Cookie Dough' },
    { value: 'peanut_butter_cup', label: 'Peanut Butter Cup' },
    { value: 'cookies_and_cream', label: 'Cookies and Cream' },
    { value: 'mocha_almond_fudge', label: 'Mocha Almond Fudge' },
    { value: 'raspberry_sorbet', label: 'Raspberry Sorbet' },
    { value: 'lemon_meringue', label: 'Lemon Meringue' },
    { value: 'strawberry_shortcake', label: 'Strawberry Shortcake' },
    { value: 'coconut_cream_pie', label: 'Coconut Cream Pie' },
    { value: 'mint_chip', label: 'Mint Chip' },
    { value: 'banana_split', label: 'Banana Split' },
    { value: 'salted_caramel_brownie', label: 'Salted Caramel Brownie' },
    { value: 'cherry_amaretto', label: 'Cherry Amaretto' },
    { value: 'black_forest', label: 'Black Forest' },
    { value: 'peach_melba', label: 'Peach Melba' },
    { value: 'cinnamon_roll', label: 'Cinnamon Roll' },
    { value: 'apple_pie', label: 'Apple Pie' }
  ];


  function selectOnChange (value : any){
    console.log(value)

    return true
  }

  //#region Modal
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  //#endregion

  //#region Render tool tip
  const renderTooltip = (props : any) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
  //#endregion

  //#region Toast

  const [showToast, setShowToast] = useState(false);
  //#endregion Toast

  //#region Canvas
  const [showCanvas, setShowCanvas] = useState(false);

  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);
  //#endregion

  return (
    <>  
       <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="https://google.com">
          Page 1
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Current Page</Breadcrumb.Item>
      </Breadcrumb>
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="secondary" />
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
      <Spinner animation="border" variant="warning" />
      <Spinner animation="border" variant="info" />
      <Spinner animation="border" variant="light" />
      <Spinner animation="border" variant="dark" />
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      <Spinner animation="grow" variant="light" />
      <Spinner animation="grow" variant="dark" />
      <h6>Form Inputs</h6>
      <div className='mt-2'>
        <InputText label='Input text' value='value' ></InputText>
      </div>
      <div className='mt-2'>
        <Textarea label='Text area' value='row row row' ></Textarea>
      </div>
      <div className='mt-2'>
        <Select options={options} isMulti={false} onChange={selectOnChange}  ></Select>
      </div>
      <div className='mt-2'>
        <Select options={options} isMulti={true} onChange={selectOnChange}  ></Select>
      </div>
      <div className='mt-2'>
        <DataGrid 
        columns={reorderedColumns} 
        rows={sortedRows}
        onRowsChange={setRows}
        onColumnsReorder={onColumnsReorder}
        sortColumns={sortColumns}
        onSortColumnsChange={onSortColumnsChange}
         />
      </div>
      <>
        {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map((variant) => (
          <Alert key={variant} variant={variant}>
            Sample {variant}
          </Alert>
        ))}
      </>
      <Button variant="primary">Primary</Button>{' '}
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>{' '}
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>{' '}
      <Button onClick={() => setShowToast(true)}>Show Toast/Notification Bar</Button>{' '}
      <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Notification</strong>
            <small>Success</small>
          </Toast.Header>
          <Toast.Body>Successfully Saved!</Toast.Body>
        </Toast>
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Button variant="success">Button with Overlay (Tootltip) on Hover</Button>
      </OverlayTrigger>
      <Button variant="primary" onClick={handleShowCanvas}>
        Launch Left Block
      </Button>

      <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Title Here</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the
          1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more r
          ecently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Offcanvas.Body>
      </Offcanvas>
      <>
      <br></br>
      <br></br>
      <Button variant="primary" onClick={handleShowModal}>
        Launch demo modal
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    <br></br>
    <br></br>
    Normal Table
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>Col 1</th>
            <th>Col 2</th>
            <th>Col 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>Foot 1</td>
            <td>Foot 2</td>
            <td>Foot 3</td>
          </tr>
        </tfoot>
    </Table>
    <br></br>
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{50}</Pagination.Item>
      <Pagination.Item>{51}</Pagination.Item>
      <Pagination.Item active>{52}</Pagination.Item>
      <Pagination.Item>{53}</Pagination.Item>
      <Pagination.Item disabled>{54}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{100}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
    </>
  )
}

export default App
