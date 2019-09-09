<template>
  <footer class="footer">
    <div class="container d-flex">
      <div class="soc-med">
        <h3>Follow Us</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/lagsdevs99/" target="_blank">Facebook</a>
          </li>
          <li>
            <a href="https://www.instagram.com/lagsdevs/" target="_blank">Instagram</a>
          </li>
        </ul>
      </div>
      <div class="contact-us">
        <h3>Contact Us</h3>
        <ul>
          <li>
            <strong>Email</strong>: lincoldarhen1899@gmail.com
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style scoped>
ul {
  list-style: none;
}
.footer {
  background-color: rgb(14, 21, 26);
  color: #fff;
  padding: 1rem;
}
.footer div {
  flex: 1;
}
a {
  text-decoration: none;
  color: rgb(192, 192, 192);
}
a:hover {
  text-decoration: underline;
}
</style>