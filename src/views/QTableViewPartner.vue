<script setup lang="ts">
  import { usePartnerStore } from "../store/partnerStore";
  import { storeToRefs } from "pinia";
  import router from "@src/router";
  import { useUsersStore } from "../store/usersStore";
  import { watch, onMounted, ref } from "vue";

  const partnerStore = usePartnerStore();
  const usersStore = useUsersStore();

  const { isLoading, partners, pagination, selected } = storeToRefs(partnerStore);
  const showEditDialog = ref(false);

  watch(isLoading, () => {
    partnerStore.getAll();
  });

  function deleteRecord(): void {
    partnerStore.deleteById();
  }

  function newRecord(): void {
    partnerStore.partner = {};
    router.push("/newpartner");
  }

  function editRecord(): void {
    partnerStore.partner = selected.value[0];
    partnerStore.getById();
    router.push("/editpartner");
  }

  function clearSelection(): void {
    selected.value = [];
  }
  function Submit() {
    partnerStore.editById();
  }
  function filterChanged(): void {
    selected.value = [];
  }
  function Reset() {
    onRequest({
      pagination: pagination.value,
    });
    showEditDialog.value = false;
  }
  function BeforeShowDialog() {
    partnerStore.getAll();
  }
  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    { name: "name", label: "name", field: "name", align: "left", sortable: true },
    { name: "address", label: "address", field: "address", align: "left", sortable: true },
    { name: "email", label: "email", field: "email", align: "left", sortable: true },
    {
      name: "phone_number",
      label: "phone_number",
      field: "phone_number",
      align: "left",
      sortable: true,
    },
    {
      name: "users_id",
      label: "users_id",
      field: "users_id",
      align: "left",
      sortable: true,
    },
  ];
  function onRequest(props: any) {
    const { page, rowsPerPage, sortBy, descending, filter } = props.pagination;
    partnerStore.fetchPaginatedPartners({
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      order: sortBy,
      sort: descending ? "-1" : "1",
      keyword: filter,
    });
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
  }
  onMounted(() => {
    partnerStore.getAll();
  });
</script>

<template>
  <q-page style="margin-top: 64px">
    <div class="q-pa-md">
      <q-table
        v-model:pagination="pagination"
        v-model:selected="selected"
        binary-state-sort
        :columns="columns"
        dense
        :filter="pagination.filter"
        row-key="_id"
        :rows="partners"
        selection="multiple"
        title="Partner"
        wrap-cells
        @request="onRequest"
      >
        <template #top-right>
          <q-input
            v-model="pagination.filter"
            debounce="300"
            dense
            placeholder="Search"
            @update:model-value="filterChanged()"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
      <!-- Buttons:  -->
      <div class="row justify-center q-ma-sm q-gutter-sm">
        <q-btn v-show="selected.length != 0" color="orange" no-caps @click="clearSelection">
          {{ selected.length > 1 ? "Clear selections" : "Clear selection" }}
        </q-btn>
        <q-btn
          v-show="usersStore.loggedUser && selected.length == 0"
          color="green"
          no-caps
          @click="newRecord"
        >
          New record
        </q-btn>
        <q-btn v-show="selected.length == 1" color="blue" no-caps @click="editRecord">
          Edit record
        </q-btn>
        <q-btn v-show="selected.length != 0" color="red" no-caps @click="deleteRecord">
          {{ selected.length > 1 ? "Delete selected records" : "Delete selected record" }}
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="showEditDialog" persistent @before-show="BeforeShowDialog()">
      <q-card class="q-pa-md" style="width: 60vw; min-width: 300px">
        <q-form class="q-mx-md" @reset="Reset()" @submit="Submit">
          <div class="row">
            <div v-if="partnerStore.partner" class="col-12 q-gutter-md">
              <h4 class="text-center q-mt-lg q-mb-none">Edit document</h4>
              <q-input
                v-model="partnerStore.partner._id"
                label="id...:"
                outlined
                rounded
                type="text"
              />
              <q-input
                v-model="partnerStore.partner.name"
                label="Name:"
                outlined
                rounded
                type="text"
              />
              <q-input
                v-model="partnerStore.partner.address"
                label="Address:"
                outlined
                rounded
                type="text"
              />
              <q-input
                v-model="partnerStore.partner.email"
                label="Email:"
                outlined
                rounded
                type="text"
              />
              <q-input
                v-model="partnerStore.partner.phone_number"
                label="Phone Number:"
                outlined
                rounded
                type="text"
              />
              <div class="row justify-center">
                <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
                <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" />
              </div>
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped></style>
