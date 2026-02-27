from flask import Flask, render_template, make_response, Response, request
import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

# additional single-page anchors or dedicated routes to help search engines index sections
@app.route('/about')
def about_page():
    # redirecting to the same template with anchor handled by browser
    return render_template('index.html')

@app.route('/contact')
def contact_page():
    return render_template('index.html')

@app.route('/robots.txt')
def robots_txt():
    # provide crawl instructions and link to sitemap
    host = request.url_root[:-1]
    lines = [
        "User-Agent: *",
        "Disallow:",
        f"Sitemap: {host}/sitemap.xml"
    ]
    return Response("\n".join(lines), mimetype="text/plain")

@app.route('/sitemap.xml')
def sitemap():
    # simple sitemap containing the root URL; expand if new pages are added
    host = request.url_root[:-1]
    pages = [host + "/"]
    sitemap_xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for page in pages:
        sitemap_xml += "  <url>\n"
        sitemap_xml += f"    <loc>{page}</loc>\n"
        sitemap_xml += "  </url>\n"
    sitemap_xml += "</urlset>"
    response = make_response(sitemap_xml)
    response.headers["Content-Type"] = "application/xml"
    return response

if __name__ == '__main__':
    app.run(debug=True)
