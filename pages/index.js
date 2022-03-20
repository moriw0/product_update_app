import { useState, useMemo } from "react";
import { Heading, Page, Button, Card, Stack, TextField, DataTable, EmptyState } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const Index = () => {
  const [appendToTitle, setAppendToTitle] = useState('');
  const [appendToDescription, setAppendToDescription] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const productTableDisplayData = useMemo(() => products.map((product) => [
    product.id,
    product.title,
    `${product.title}${appendToTitle}`,
    product.descriptionHtml,
    `${product.descriptionHtml}$${appendToDescription}`
  ]), [products, appendToTitle, appendToDescription]);

  return (
    <Page>
      <Heading>
        Update Product
      </Heading>
      <Card>
        <Card.Section>
          <Stack vertical>
            <TextField
              label="Append to title"
              value={appendToTitle}
              onChange={setAppendToTitle}
            />
            <TextField
              label="Append to description"
              value={appendToDescription}
              onChange={setAppendToDescription}
              multiline={3}
            />
            <ResourcePicker
              resourceType="Product"
              showVariant={false}
              open={pickerOpen}
              onSelection={(resources) => {
                console.log(resources);
                setProducts(resources.selection);
              }}
            />
            <Button primary onClick={() => setPickerOpen(true)}>Select Products</Button>
          </Stack>
        </Card.Section>
        <Card.Section>
          {productTableDisplayData.length ? <DataTable
            columnContentTypes={['text', 'text', 'text', 'text', 'text']}
            headings={['ID', 'Old Title', 'New Title', 'Old Description', 'New Description']}
            rows={productTableDisplayData}
          /> : <EmptyState heading="No products selected" /> }
        </Card.Section>
      </Card>
    </Page>
  )
};

export default Index;
