<template>
  <el-form :model="form" :rules="rules" ref="ruleForm">
    <el-form-item label="Title" prop="title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
<el-form-item label="Release Date" prop="date">
      <el-date-picker v-model="form.date" type="date" placeholder="Release Date"></el-date-picker>
    </el-form-item>
<el-form-item label="Summary" prop="summary">
      <el-input v-model="form.summary" type="textarea"></el-input>
    </el-form-item>
<el-form-item>
      <input type="file" style="display: none" ref="file" @change="onChangeFileUpload($event)" />
      <el-button type="primary" @click="$refs.file.click()">Upload Photo</el-button>
    </el-form-item>
<el-form-item prop="photo">
      <img ref="photo" :src="form.photo" class="photo" />
    </el-form-item>
<el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { requestsMixin } from "@/mixins/requestsMixin";
export default {
  name: "MovieForm",
  mixins: [requestsMixin],
  props: {
    movie: Object,
    edit: Boolean
  },
  data() {
    return {
      form: {},
      rules: {
        title: [
          {
            required: true,
            message: "Please input title",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "Please input date",
            trigger: "blur"
          }
        ],
        summary: [
          {
            required: true,
            message: "Please input summary",
            trigger: "blur"
          }
        ],
        photo: [
          {
            required: true,
            message: "Please upload photo",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.edit) {
            await this.editMovie(this.form);
          } else {
            await this.addMovie(this.form);
          }
          const { data } = await this.getMovies();
          this.$store.commit("setMovies", data);
          this.$emit("saved");
        }
        return false;
      });
    },
    cancel() {
      this.$emit("cancelled");
    },
    onChangeFileUpload($event) {
      const file = $event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.$refs.photo.src = reader.result;
        this.form.photo = reader.result;
      };
      reader.readAsDataURL(file);
    }
  },
  watch: {
    movie: {
      handler(val) {
        this.form = JSON.parse(JSON.stringify(val || {}));
      },
      deep: true,
      immediate: true
    }
  }
};
</script>