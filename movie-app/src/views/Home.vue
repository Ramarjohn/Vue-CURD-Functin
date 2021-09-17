<template>
  <div class="page" id='top'>
    <h1 class="text-center">Recipes</h1>
    <b-button-toolbar class="button-toolbar">
      <b-button @click="openAddModal()" variant="primary">Add Recipe</b-button>
    </b-button-toolbar>
    <b-card
      v-for="r in recipes"
      :key="r.id"
      :title="r.name"
      :img-src="r.photo"
      img-alt="Image"
      img-top
      tag="article"
      class="recipe-card"
      img-bottom
    >
      <b-card-text>
        <h1>Ingredients</h1>
        <div class="wrap">{{r.ingredients}}</div>
      </b-card-text>
      <b-card-text>
        <h1>Recipe</h1>
        <div class="wrap">{{r.recipe}}</div>
      </b-card-text>
      <b-button
        href="#"
        v-scroll-to="{
          el: '#top',
          container: 'body',
          duration: 500,
          easing: 'linear',
          offset: -200,
          force: true,
          cancelable: true,
          x: false,
          y: true
        }"
        variant="primary"
      >Scroll to Top</b-button>
      <b-button @click="openEditModal(r)" variant="primary">Edit</b-button>
      <b-button @click="deleteOneRecipe(r.id)" variant="danger">Delete</b-button>
    </b-card>
    <b-modal id="add-modal" title="Add Recipe" hide-footer>
      <RecipeForm @saved="closeModal()" @cancelled="closeModal()" :edit="false" />
    </b-modal>
     <b-modal id="edit-modal" title="Edit Recipe" hide-footer>
      <RecipeForm
        @saved="closeModal()"
        @cancelled="closeModal()"
        :edit="true"
        :recipe="selectedRecipe"
      />
    </b-modal>
  </div>
</template>
<script>
// @ is an alias to /src
import RecipeForm from "@/components/RecipeForm.vue";
import { requestsMixin } from "@/mixins/requestsMixin";
export default {
  name: "home",
  components: {
    RecipeForm
  },
  mixins: [requestsMixin],
  computed: {
    recipes() {
      return this.$store.state.recipes;
    }
  },
  beforeMount() {
    this.getAllRecipes();
  },
  data() {
    return {
      selectedRecipe: {}
    };
  },
  methods: {
    openAddModal() {
      this.$bvModal.show("add-modal");
    },
    openEditModal(recipe) {
      this.$bvModal.show("edit-modal");
      this.selectedRecipe = recipe;
    },
    closeModal() {
      this.$bvModal.hide("add-modal");
      this.$bvModal.hide("edit-modal");
      this.selectedRecipe = {};
    },
    async deleteOneRecipe(id) {
      await this.deleteRecipe(id);
      this.getAllRecipes();
    },
    async getAllRecipes() {
      const { data } = await this.getRecipes();
      this.$store.commit("setRecipes", data);
    }
  }
};
</script>