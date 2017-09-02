### Changes made by me to crispy_forms files

####In crispy_forms/templates/bootstrap3/field.html:

I replaced this original segment:

    {% if field.label and not field|is_checkbox and form_show_labels %}
        <label for="{{ field.id_for_label }}" class="control-label {{ label_class }}{% if field.field.required %} requiredField{% endif %}">
            {{ field.label|safe }}{% if field.field.required %}<span class="asteriskField">*</span>{% endif %}
        </label>
    {% endif %}

For this segment:

    {% if field.label and not field|is_checkbox and form_show_labels %}
        <label for="{{ field.id_for_label }}" class="control-label {{ label_class }}{% if field.field.required %} requiredField{% endif %}">
            {% if label_info %}<span class="labelInfo glyphicon glyphicon-info-sign" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"></span><span> </span>{% endif %}{{ field.label|safe }}{% if field.field.required %}<span class="asteriskField">*</span>{% endif %}
        </label>
    {% endif %}

And this original segment:

    {% if field|is_checkbox and form_show_labels %}
        <label for="{{ field.id_for_label }}" class="{% if field.field.required %} requiredField{% endif %}">
            {% crispy_field field %}
            {{ field.label|safe }}
        </label>
        {% include 'bootstrap3/layout/help_text_and_errors.html' %}
    {% else %}

For this segment:

    {% if field|is_checkbox and form_show_labels %}
        <label for="{{ field.id_for_label }}" class="{% if field.field.required %} requiredField{% endif %}">
            {% crispy_field field %}
            {{ field.label|safe }}
        </label>
        {% if label_info %}<span> </span><span class="labelInfo glyphicon glyphicon-info-sign" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"></span>{% endif %}
        {% include 'bootstrap3/layout/help_text_and_errors.html' %}
    {% else %}

####In crispy_forms/templates/bootstrap3/layout/prepended_appended_text.html

I replaced this original segment:

    {% if field.label and form_show_labels %}
        <label for="{{ field.id_for_label }}" class="control-label {{ label_class }}{% if field.field.required %} requiredField{% endif %}">
            {{ field.label|safe }}{% if field.field.required %}<span class="asteriskField">*</span>{% endif %}
        </label>
    {% endif %}

For this segment:

    {% if field.label and form_show_labels %}
        <label for="{{ field.id_for_label }}" class="control-label {{ label_class }}{% if field.field.required %} requiredField{% endif %}">
            {% if label_info %}<span class="labelInfo glyphicon glyphicon-info-sign" aria-hidden="true" data-toggle="tooltip" data-placement="bottom"></span><span> </span>{% endif %}{{ field.label|safe }}{% if field.field.required %}<span class="asteriskField">*</span>{% endif %}
        </label>
    {% endif %}

And this original segment:

    {% else %}
        <div class="input-group">
            {% if crispy_prepended_text %}<span class="input-group-addon{% if active %} active{% endif %}{% if input_size %} {{ input_size }}{% endif %}">{{ crispy_prepended_text|safe }}</span>{% endif %}
            {% crispy_field field %}
            {% if crispy_appended_text %}<span class="input-group-addon{% if active %} active{% endif %}{% if input_size %} {{ input_size }}{% endif %}">{{ crispy_appended_text|safe }}</span>{% endif %}
        </div>
    {% endif %}

For this segment:

    {% else %}
        <div class="input-group">
            {% if crispy_prepended_text %}<span class="input-group-addon{% if active %} active{% endif %}{% if input_size %} {{ input_size }}{% endif %}">{{ crispy_prepended_text|safe }}</span>{% endif %}
            {% crispy_field field %}
            {% if crispy_appended_text %}<span class="input-group-addon{% if active %} active{% endif %}{% if input_size %} {{ input_size }}{% endif %}">{% if append_label_suffix %} {{ field.field.label_suffix|safe }} {% else %} {{ crispy_appended_text|safe }} {% endif %}</span>{% endif %}
        </div>
    {% endif %}
