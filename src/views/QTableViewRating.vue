<script setup lang="ts">
  import { useRatingStore } from "../store/ratingStore";
  import { storeToRefs } from "pinia";
  import router from "@src/router";
  import { useUsersStore } from "../store/usersStore";
  import { watch, onMounted, ref } from "vue";

  const ratingStore = useRatingStore();
  const usersStore = useUsersStore();

  const { isLoading, pagination, ratings, selected } = storeToRefs(ratingStore);
  const showEditDialog = ref(false);

  watch(isLoading, () => {
    ratingStore.getAll();
  });

  function deleteRecord(): void {
    ratingStore.deleteById();
  }

  function newRecord(): void {
    ratingStore.rating = {};
    router.push("/newrating");
  }

  function editRecord(): void {
    ratingStore.rating = selected.value[0];
    ratingStore.getById();
    router.push("/editrating");
  }

  function clearSelection(): void {
    selected.value = [];
  }
  function Submit() {
    ratingStore.editById();
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
    ratingStore.getAll();
  }

  const columns: any[] = [
    { name: "_id", label: "_id", field: "_id", align: "left", sortable: true },
    { name: "star", label: "star", field: "star", align: "left", sortable: true },
    { name: "comment", label: "comment", field: "comment", align: "left", sortable: true },
  ];
  function onRequest(props: any) {
    const { page, rowsPerPage, sortBy, descending, filter } = props.pagination;
    ratingStore.fetchPaginatedRatings({
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
      order: sortBy,
      sort: descending ? "-1" : "1",
      keyword: filter,
    });
    // don't forget to update local pagination object
    pagination.value.page = page;
    pagination.value.rowsPerPage = rowsPerPage;
    pagination.value.sortBy = sortBy;
    pagination.value.descending = descending;
  }
  onMounted(() => {
    ratingStore.getAll();
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
        :rows="ratings"
        selection="multiple"
        title="Rating"
        wrap-cells
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
      <!-- <p>Pagination object: {{ pagination }}</p> -->
      <!-- <p>Selected array: {{ selected }}</p> -->
      <!-- <div>Filter: "{{ pagination.filter }}"</div> -->
    </div>
    <q-dialog v-model="showEditDialog" persistent @before-show="BeforeShowDialog()">
      <q-card class="q-pa-md" style="width: 60vw; min-width: 300px">
        <q-form class="q-mx-md" @reset="Reset()" @submit="Submit">
          <div class="row">
            <div v-if="ratingStore.rating" class="col-12 q-gutter-md">
              <h4 class="text-center q-mt-lg q-mb-none">Edit document</h4>
              <q-input
                v-model="ratingStore.rating._id"
                label="id...:"
                outlined
                rounded
                type="text"
              />
              <q-input
                v-model="ratingStore.rating.star"
                label="Star:"
                outlined
                rounded
                type="text"
              />
              <q-input
                v-model="ratingStore.rating.comment"
                label="Comment:"
                outlined
                rounded
                type="text"
              />
              <div class="row justify-center">
                <q-btn class="q-mr-md" color="green" label="Save" no-caps type="submit" />
                <q-btn class="q-mr-md" color="red" label="Cancel" no-caps type="reset" />
              </div>

              <!-- p>Actual: {{ ratingStore.rating }}</p> -->

              <!-- <p>Old: {{ ratingStore.productOld }}</p> -->

              <!-- <p>Selected: {{ ratingStore.selected }}</p> -->
            </div>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped></style>
